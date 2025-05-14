import { useState } from 'react';

export default function PromptRecommender() {
  const [goal, setGoal] = useState('블로그 글쓰기');
  const [style, setStyle] = useState('친근한');
  const [prompt, setPrompt] = useState('');

  const templates = {
    '블로그 글쓰기': {
      '친근한': `너는 따뜻하고 대화하듯 글을 쓰는 블로거야.
📌 출력 형식: 제목 / 서론-본론-결론 / 질문 마무리
📌 문체 지시: 말하듯 편안하게
📎 출력 방식: 마크다운`,
      '전문적인': `너는 업계 분석을 잘하는 콘텐츠 마케터야.
📌 출력 형식: 문제 제기 / 해결 방안 / 사례 / 요약
📌 문체 지시: 전문적이고 객관적인 문체
📎 출력 방식: PDF, 마크다운`,
      '유머러스한': `너는 유쾌한 블로거야. 밈처럼 재치있게 써줘.
📌 출력 형식: 제목 / 2단락 본문 / 농담 포함
📌 문체 지시: 유머와 위트를 살려줘
📎 출력 방식: 블로그 HTML`,
      '감성적인': `너는 감성 에세이 작가야.
📌 출력 형식: 도입 / 묘사 / 여운 있는 결말
📌 문체 지시: 감성적이고 서정적인 표현
📎 출력 방식: 브런치 스타일`,
      '간결한': `너는 핵심만 전하는 작가야.
📌 출력 형식: 제목 / 3~5문장 요약
📌 문체 지시: 간단명료, 직관적
📎 출력 방식: 트위터 포스트`
    },
    '제품 설명': {
      '친근한': `너는 홈쇼핑 쇼호스트야.
📌 출력 형식: 제품 이름 / 특징 3가지 / 일상 사용 예
📌 문체 지시: 쉽고 친근한 톤
📎 출력 방식: 마크다운`,
      '전문적인': `너는 브랜드 마케팅 전문가야.
📌 출력 형식: 제품명 / 기능 리스트 / 기술 요약
📌 문체 지시: 전문 용어와 신뢰감 있는 문체
📎 출력 방식: PDF 또는 기업 소개용`,
      '유머러스한': `너는 광고 카피라이터야.
📌 출력 형식: 재치있는 제품명 / 슬로건 / 해시태그
📌 문체 지시: 유쾌하고 기억에 남는 문장
📎 출력 방식: SNS 홍보용`,
      '감성적인': `너는 감성 마케터야.
📌 출력 형식: 감동적인 도입 / 경험담 / 제품 연결
📌 문체 지시: 공감과 감정 호소 중심
📎 출력 방식: 카드뉴스`,
      '간결한': `너는 요약 마스터야.
📌 출력 형식: 제품명 / 기능요약 / CTA 문장
📌 문체 지시: 짧고 명확하게
📎 출력 방식: 이커머스 상세페이지`
    }
  };

  const generatePrompt = () => {
    const selected = templates[goal]?.[style] ?? '해당 조합의 프롬프트가 준비되지 않았습니다.';
    setPrompt(selected);
  };

  return (
    <div>
      <h2>🎯 AI 프롬프트 추천기</h2>
      <select value={goal} onChange={(e) => setGoal(e.target.value)}>
        {Object.keys(templates).map((g) => (
          <option key={g}>{g}</option>
        ))}
      </select>
      <select value={style} onChange={(e) => setStyle(e.target.value)}>
        {Object.keys(templates[goal] || {}).map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <button onClick={generatePrompt}>프롬프트 생성</button>
      <pre>{prompt}</pre>
    </div>
  );
}
