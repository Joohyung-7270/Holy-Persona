import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3004',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Allow-Credentials': 'true',
};

// Supabase 클라이언트 초기화
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Character image mapping
const characterImageMap: { [key: string]: string } = {
  '다윗': '/images/다윗.jpg',      // LAFO - Young shepherd with harp
  '베드로': '/images/베드로.jpg',    // LAFI - Fisherman casting net
  '모세': '/images/모세.jpg',      // LATO - With burning bush
  '엘리야': '/images/엘리야.jpg',   // LATI - On Mount Carmel
  '에스더': '/images/에스더.jpg',   // LRFO - Queen in court
  '마리아': '/images/마리아.jpg',     // LRFI - Mother with child
  '솔로몬': '/images/솔로몬.jpg',  // LRTO - Wise king
  '바울': '/images/바울.jpg',       // LRTI - On Damascus road
  '요나': '/images/요나.jpg',      // SAFO - In stormy sea
  '한나': '/images/한나.jpg',     // SAFI - Praying in temple
  '느헤미야': '/images/느헤미야.jpg', // SATO - Building wall
  '요셉': '/images/요셉.jpg',     // SATI - In Egyptian palace
  '라합': '/images/라합.jpg',      // SRFO - With scarlet cord
  '룻': '/images/룻.jpg',         // SRFI - Gleaning in fields
  '아브라함': '/images/아브라함.jpg', // SRTO - Under stars
  '디모데': '/images/디모데.jpg'   // SRTI - Reading letters
};

// 성격 유형 분석 함수
async function analyzePersonalityType(answers: { questionId: number, optionId: number }[]) {
  try {
    // 1. 선택된 옵션들의 mapped_value를 가져오기
    const optionIds = answers.map(a => a.optionId);
    const { data: options, error: optionsError } = await supabase
      .from('options')
      .select('mapped_value')
      .in('id', optionIds);

    if (optionsError) throw optionsError;
    if (!options) throw new Error('No options found');

    // 2. 각 축별 점수 계산
    const scores = {
      leadership: 0, // L vs S
      action: 0,     // A vs R
      feeling: 0,    // F vs T
      faith: 0       // O vs I
    };

    // 각 옵션의 mapped_value에 따라 점수 계산
    options.forEach(option => {
      const value = option.mapped_value;
      if (value.includes('L')) scores.leadership++;
      if (value.includes('A')) scores.action++;
      if (value.includes('F')) scores.feeling++;
      if (value.includes('O')) scores.faith++;
    });

    // 3. 성격 유형 결정
    const type = [
      scores.leadership > 2 ? 'L' : 'S',
      scores.action > 2 ? 'A' : 'R',
      scores.feeling > 2 ? 'F' : 'T',
      scores.faith > 2 ? 'O' : 'I'
    ].join('');

    return type;
  } catch (error) {
    console.error('Error analyzing personality type:', error);
    throw error;
  }
}

// OPTIONS handler
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const personalityType = body.type;

    if (!personalityType) {
      return NextResponse.json(
        { error: 'Invalid request body. Personality type is required.' },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }

    // 해당 유형의 성경 인물 정보 가져오기
    const { data: character, error: characterError } = await supabase
      .from('bible_characters')
      .select('*')
      .eq('type', personalityType)
      .single();

    if (characterError) {
      console.error('Error fetching character:', characterError);
      return NextResponse.json(
        { 
          error: 'Failed to fetch character data',
          details: characterError.message
        },
        { 
          status: 500,
          headers: corsHeaders
        }
      );
    }

    if (!character) {
      return NextResponse.json(
        { 
          error: 'No character found for the given personality type',
          type: personalityType
        },
        { 
          status: 404,
          headers: corsHeaders
        }
      );
    }

    // 결과 반환
    return NextResponse.json({
      type: character.type,
      name: character.name,
      title: character.title || '',
      description: character.description,
      image: characterImageMap[character.name] || '/images/default.jpg',
      characteristics: character.characteristics || [],
      blessing: character.blessing || ''
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
} 