import { useState } from 'react';

export default function PromptRecommender() {
  const [goal, setGoal] = useState('블로그 글쓰기');
  const [style, setStyle] = useState('친근한');
  const [prompt, setPrompt] = useState('');

  const templates = {
    '블로그 글쓰기': {
      '친근한': '너는 친근한 블로거야. 마크다운 포맷으로 작성해줘.',
      '전문적인': '전문가 관점으로 분석하고 문제 해결 구조로 써줘.',
      '유머러스한': '밈 느낌의 유쾌한 블로그 글을 작성해줘.',
      '감성적인': '감성적인 에세이처럼 따뜻하게 써줘.',
      '간결한': '핵심 요약 위주로 간단하게 작성해줘.'
    },
    '제품 설명': {
      '친근한': '일상 언어로 쉽게 제품을 소개해줘.',
      '전문적인': '기능과 기술 기반으로 자세히 분석해줘.',
      '유머러스한': '광고 카피처럼 웃기고 기억나게 써줘.',
      '감성적인': '스토리텔링을 기반으로 감성 자극 문구를 써줘.',
      '간결한': '한눈에 들어오는 요약 중심으로 써줘.'
    },
    'SNS 콘텐츠': {
      '친근한': '이모지와 함께 짧고 다정하게 써줘.',
      '전문적인': '링크드인 스타일로 정보 중심 콘텐츠를 작성해줘.',
      '유머러스한': '밈 스타일로 재치 있게 표현해줘.',
      '감성적인': '공감가는 따뜻한 메시지로 써줘.',
      '간결한': '한 줄 핵심 문장으로 표현해줘.'
    },
    '이메일 작성': {
      '친근한': '고객과의 대화처럼 부드럽고 정중하게 써줘.',
      '전문적인': '비즈니스 이메일 포맷으로 전문적이고 정중하게 작성해줘.',
      '유머러스한': '적당한 위트와 함께 전달력 있게 써줘.',
      '감성적인': '감사와 마음을 전하는 따뜻한 메시지를 써줘.',
      '간결한': '3문장 이하로 명료하게 구성해줘.'
    },
    '스토리텔링': {
      '친근한': '친구에게 들려주듯 자연스럽게 써줘.',
      '전문적인': '브랜드 서사를 중심으로 전략적 스토리 구성.',
      '유머러스한': '반전과 웃음 포인트가 있는 이야기로 구성해줘.',
      '감성적인': '감정을 자극하는 묘사 중심 서사를 작성해줘.',
      '간결한': '3문장 이내의 짧은 이야기로 구성해줘.'
    }
  };

  const generatePrompt = () => {
    const selected = templates[goal]?.[style] ?? '해당 조합의 프롬프트가 준비되지 않았습니다.';
    setPrompt(selected);
  };

  return (
    <div className="container">
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
      <textarea readOnly value={prompt} />
    </div>
  );
}
