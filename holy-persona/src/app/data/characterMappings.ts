export interface CharacterMapping {
  id: number;
  combination: string;
  character: string;
  traits: string;
  mbti: string;
  imageUrl: string;
}

export const characterMappings: CharacterMapping[] = [
  {
    id: 1,
    combination: "L A F O",
    character: "다윗",
    traits: "주도적 + 행동적 + 감정적 + 뜨겁게 선포하는 신앙",
    mbti: "ENFP",
    imageUrl: "/images/david.jpg"
  },
  {
    id: 2,
    combination: "L A F I",
    character: "베드로",
    traits: "충동적이지만 진심 있는 회개와 리더십",
    mbti: "ESFP",
    imageUrl: "/images/peter.jpg"
  },
  {
    id: 3,
    combination: "L A T O",
    character: "모세",
    traits: "실행력 + 리더십 + 명확한 사명 + 이성적",
    mbti: "ENTJ",
    imageUrl: "/images/moses.jpg"
  },
  {
    id: 4,
    combination: "L A T I",
    character: "엘리아",
    traits: "강한 실행력과 이성, 동시에 내면적 고뇌를 가진 선지자",
    mbti: "INTJ",
    imageUrl: "/images/elijah.jpg"
  },
  {
    id: 5,
    combination: "L R F O",
    character: "에스더",
    traits: "조용하지만 기회를 보고 리더십 발휘, 백성 구원",
    mbti: "INFJ",
    imageUrl: "/images/esther.jpg"
  },
  {
    id: 6,
    combination: "L R F I",
    character: "마리아 (예수 어머니)",
    traits: "깊은 내면의 신앙과 순종의 리더십",
    mbti: "ISFJ",
    imageUrl: "/images/mary.jpg"
  },
  {
    id: 7,
    combination: "L R T O",
    character: "솔로몬",
    traits: "지혜 중심, 통찰력 있는 판단과 공개 리더십",
    mbti: "INTP",
    imageUrl: "/images/solomon.jpg"
  },
  {
    id: 8,
    combination: "L R T I",
    character: "바울",
    traits: "논리적이며 사명감 있는 내면 신앙과 탁월한 설교·서신",
    mbti: "ISTJ",
    imageUrl: "/images/paul.jpg"
  },
  {
    id: 9,
    combination: "S A F O",
    character: "요나",
    traits: "감정적·충동적, 하나님과 솔직한 갈등, 회개",
    mbti: "ISFP",
    imageUrl: "/images/jonah.jpg"
  },
  {
    id: 10,
    combination: "S A F I",
    character: "한나",
    traits: "감정을 하나님께 온전히 드리는, 조용하지만 강한 기도자",
    mbti: "INFP",
    imageUrl: "/images/hannah.jpg"
  },
  {
    id: 11,
    combination: "S A T O",
    character: "느헤미야",
    traits: "섬기는 자세, 조직적이며 행동 중심의 전략적 인물",
    mbti: "ESTJ",
    imageUrl: "/images/nehemiah.jpg"
  },
  {
    id: 12,
    combination: "S A T I",
    character: "요셉",
    traits: "고난 중에도 흔들리지 않는 내면 신앙 + 실행력",
    mbti: "ISTP",
    imageUrl: "/images/joseph.jpg"
  },
  {
    id: 13,
    combination: "S R F O",
    character: "라합",
    traits: "기회 포착형 + 믿음을 외적으로 표현하는 용기 있는 신앙",
    mbti: "ENFJ",
    imageUrl: "/images/rahabs.jpg"
  },
  {
    id: 14,
    combination: "S R F I",
    character: "룻",
    traits: "신중하고 헌신적인 자세, 감정 중심적 관계",
    mbti: "ISFP",
    imageUrl: "/images/ruth.jpg"
  },
  {
    id: 15,
    combination: "S R T O",
    character: "아브라함",
    traits: "신중하지만 하나님의 뜻엔 과감히 행동, 약속을 신뢰",
    mbti: "INFJ",
    imageUrl: "/images/abraham.jpg"
  },
  {
    id: 16,
    combination: "S R T I",
    character: "디모데",
    traits: "내향적이며 조용히 배움과 성장을 이어간 충직한 인물",
    mbti: "ISTP",
    imageUrl: "/images/timothy.jpg"
  }
]; 