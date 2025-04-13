import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { answers } = body;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return Response.json({ error: 'Invalid answers format' }, { status: 400 });
    }

    const result = determineType(answers);

    // Supabase에서 해당 유형에 맞는 인물 검색
    const { data, error } = await supabase
      .from('bible_characters')
      .select('*')
      .eq('type', result);

    if (error) {
      console.error('Supabase error:', error);
      return Response.json({ error: 'Database error' }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return Response.json({ 
        error: 'No character found for this type',
        result 
      }, { status: 404 });
    }

    return Response.json({ result, character: data[0] });
  } catch (error) {
    console.error('Server error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function determineType(answers) {
    const pairs = [
      ["L", "S"],
      ["A", "R"],
      ["F", "T"],
      ["O", "I"]
    ];
  
    const counts = {
      L: 0, S: 0,
      A: 0, R: 0,
      F: 0, T: 0,
      O: 0, I: 0
    };
    // 각 유형 카운트
    for (const answer of answers) {
      if (counts.hasOwnProperty(answer)) {
        counts[answer]++;
      }
    }
  
    // 각 쌍마다 더 높은 쪽 선택 (같으면 왼쪽 우선)
    let result = "";
    for (const [left, right] of pairs) {
      result += counts[left] >= counts[right] ? left : right;
    }
  
    return result;
  }
  
