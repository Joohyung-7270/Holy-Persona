export interface Question {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    type: string;
  }[];
  axis: string;
  axisDescription: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "팀이 중요한 결정을 못 내리고 혼란스러울 때, 당신의 태도는?",
    options: [
      { id: "A", text: "'이렇게 하자'며 주도적으로 방향을 제시한다.", type: "L" },
      { id: "B", text: "리더를 도와서 중간에서 사람들의 의견을 조율한다.", type: "S" },
      { id: "C", text: "전체를 다 끌고 가기보단, 필요한 부분을 책임지고 해결한다.", type: "S" },
      { id: "D", text: "팀원들을 독려하고 최종 결정권자로서 책임지겠다 선언한다.", type: "L" }
    ],
    axis: "Leadership (L) vs. Support (S)",
    axisDescription: "리더십과 지원 스타일의 균형"
  },
  {
    id: 2,
    question: "프로젝트가 시작될 때, 당신이 가장 하고 싶은 역할은?",
    options: [
      { id: "A", text: "팀 전체 리더가 되어 사람을 이끌며 목표를 정한다.", type: "L" },
      { id: "B", text: "내가 맡은 파트를 확실히 끝내서 팀에 기여한다.", type: "S" },
      { id: "C", text: "부족한 부분을 옆에서 보완하며 팀워크를 강화한다.", type: "S" },
      { id: "D", text: "조장이나 책임자를 맡아 최종 성과를 책임진다.", type: "L" }
    ],
    axis: "Leadership (L) vs. Support (S)",
    axisDescription: "리더십과 지원 스타일의 균형"
  },
  {
    id: 3,
    question: "기회가 찾아오면 당신의 반응은?",
    options: [
      { id: "A", text: "고민하기보다 바로 도전하며 경험을 쌓는다.", type: "A" },
      { id: "B", text: "실행하면서 배우는 과정 자체를 즐긴다.", type: "A" },
      { id: "C", text: "위험요소와 대안을 충분히 검토한 후에 움직인다.", type: "R" },
      { id: "D", text: "여러 사람 조언을 듣고 정교한 계획을 세운 뒤 시작한다.", type: "R" }
    ],
    axis: "Action (A) vs. Reflection (R)",
    axisDescription: "행동과 성찰의 균형"
  },
  {
    id: 4,
    question: "새로운 일이나 사역 제안을 받았을 때, 가장 가까운 태도는?",
    options: [
      { id: "A", text: "일단 해보면서 부족한 건 채워가자는 마음으로 시작.", type: "A" },
      { id: "B", text: "의욕 넘쳐서 바로 행동으로 옮기고 싶다.", type: "A" },
      { id: "C", text: "충돌이나 리스크를 줄이기 위해 사전 준비가 필수다.", type: "R" },
      { id: "D", text: "성공 확률을 높이기 위해 정보와 자료를 많이 찾는다.", type: "R" }
    ],
    axis: "Action (A) vs. Reflection (R)",
    axisDescription: "행동과 성찰의 균형"
  },
  {
    id: 5,
    question: "갈등 상황이 생겼을 때, 가장 먼저 드는 생각은?",
    options: [
      { id: "A", text: "상대방 마음을 먼저 이해하고 감정을 공감해준다.", type: "F" },
      { id: "B", text: "대화를 통해 서로 감정적으로 풀어가는 과정이 중요하다.", type: "F" },
      { id: "C", text: "문제의 원인을 논리적으로 분석해서 해결책을 찾는다.", type: "T" },
      { id: "D", text: "서로 주장이 달라도 사실관계를 확실히 파악하는 게 우선이다.", type: "T" }
    ],
    axis: "Feeling (F) vs. Thinking (T)",
    axisDescription: "감정과 논리의 균형"
  },
  {
    id: 6,
    question: "친구가 힘든 일을 털어놓았을 때, 당신은?",
    options: [
      { id: "A", text: "먼저 함께 감정적으로 공감하며 위로해준다.", type: "F" },
      { id: "B", text: "친구와 함께 울고 웃으며 감정을 나누는 것이 중요하다.", type: "F" },
      { id: "C", text: "해결 방안을 논리적으로 제시해 주려 한다.", type: "T" },
      { id: "D", text: "대안을 차근차근 단계별로 정리해 조언한다.", type: "T" }
    ],
    axis: "Feeling (F) vs. Thinking (T)",
    axisDescription: "감정과 논리의 균형"
  },
  {
    id: 7,
    question: "예배 중, 가장 마음이 뜨거워지는 순간은?",
    options: [
      { id: "A", text: "찬양하며 기쁨을 크게 표현할 때", type: "O" },
      { id: "B", text: "함께 기도하고 서로 소리 내어 은혜를 나눌 때", type: "O" },
      { id: "C", text: "설교나 말씀을 듣고 조용히 묵상에 잠길 때", type: "I" },
      { id: "D", text: "개인적으로 기도노트에 적으며 내면에 집중할 때", type: "I" }
    ],
    axis: "Outward Faith (O) vs. Inward Faith (I)",
    axisDescription: "외향적 신앙과 내향적 신앙의 균형"
  },
  {
    id: 8,
    question: "당신의 신앙생활 스타일은?",
    options: [
      { id: "A", text: "예배나 기도모임 등, 함께 뜨겁게 은혜 나누는 걸 좋아한다.", type: "O" },
      { id: "B", text: "간증을 하거나 선포하며 믿음을 표현할 때 기쁨이 크다.", type: "O" },
      { id: "C", text: "말씀을 개인적으로 필사하고 깊이 묵상하는 시간을 중시한다.", type: "I" },
      { id: "D", text: "조용히 내면에 집중하며 하나님의 음성을 구하는 편이다.", type: "I" }
    ],
    axis: "Outward Faith (O) vs. Inward Faith (I)",
    axisDescription: "외향적 신앙과 내향적 신앙의 균형"
  }
]; 