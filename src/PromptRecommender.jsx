
import { useState } from 'react';

export default function PromptRecommender() {
  const [goal, setGoal] = useState('블로그 글쓰기');
  const [style, setStyle] = useState('감성적인');
  const [subject, setSubject] = useState('');
  const [prompt, setPrompt] = useState('');

  const templates = {
    '블로그 글쓰기': {
      '친근한': `너는 친근한 말투의 블로거야. 주제: "{{subject}}"
📌 출력 형식: 제목 / 서론-본론-결론
📌 문체 지시: 말하듯 자연스럽게
📎 출력 방식: 마크다운`,
      '전문적인': `너는 업계 전문가야. 주제: "{{subject}}"
📌 출력 형식: 문제 정의 / 분석 / 해결
📌 문체 지시: 객관적이고 분석적인 어조
📎 출력 방식: PDF 또는 마크다운`,
      '유머러스한': `너는 재치 있는 블로거야. 주제: "{{subject}}"
📌 출력 형식: 농담 섞인 본문 / 슬로건
📌 문체 지시: 유쾌하고 재밌게
📎 출력 방식: HTML 또는 블로그`,
      '감성적인': `너는 감성적인 에세이 작가야. 주제: "{{subject}}"
📌 출력 형식: 감정 서사 / 여운 있는 마무리
📌 문체 지시: 따뜻하고 서정적인 표현
📎 출력 방식: 마크다운`,
      '간결한': `너는 요약의 달인이야. 주제: "{{subject}}"
📌 출력 형식: 3문장 이내 핵심 요약
📌 문체 지시: 명확하고 직설적
📎 출력 방식: 트위터용`
    },
    '제품 설명': {
      '친근한': `너는 쇼호스트야. 제품: "{{subject}}"
📌 출력 형식: 특징 소개 / 활용 예
📌 문체 지시: 편하고 다정한 어조
📎 출력 방식: 상세 페이지`,
      '전문적인': `너는 기술 마케터야. 제품: "{{subject}}"
📌 출력 형식: 기능 / 사양 / 장점
📌 문체 지시: 전문용어 포함
📎 출력 방식: PDF`,
      '유머러스한': `너는 광고 카피라이터야. 제품: "{{subject}}"
📌 출력 형식: 밈 스타일 / 슬로건 포함
📌 문체 지시: 유쾌하고 창의적으로
📎 출력 방식: SNS`,
      '감성적인': `너는 감성을 자극하는 마케터야. 제품: "{{subject}}"
📌 출력 형식: 공감 스토리 / 가치 연결
📌 문체 지시: 감성적 호소 중심
📎 출력 방식: 카드뉴스`,
      '간결한': `너는 요약 마스터야. 제품: "{{subject}}"
📌 출력 형식: 3줄 이내 요약 / CTA 포함
📌 문체 지시: 간단명료하게
📎 출력 방식: 모바일 상세`
    },
    'SNS 콘텐츠': {
      '친근한': `너는 친구처럼 소통하는 SNS 운영자야. 주제: "{{subject}}"
📌 출력 형식: 이모지 포함 짧은 문장
📌 문체 지시: 말하듯이 부드럽게
📎 출력 방식: 인스타그램`,
      '전문적인': `너는 링크드인 콘텐츠 전략가야. 주제: "{{subject}}"
📌 출력 형식: 분석 포인트 / 요약 강조
📌 문체 지시: 신뢰감 있고 정중하게
📎 출력 방식: 링크드인`,
      '유머러스한': `너는 밈 장인이야. 주제: "{{subject}}"
📌 출력 형식: 웃긴 문구 / 해시태그 포함
📌 문체 지시: 유머러스하고 재치있게
📎 출력 방식: 트위터`,
      '감성적인': `너는 감성 콘텐츠 디자이너야. 주제: "{{subject}}"
📌 출력 형식: 공감 메시지 / 키워드 강조
📌 문체 지시: 따뜻한 감정 중심
📎 출력 방식: 카드뉴스`,
      '간결한': `너는 요약형 콘텐츠를 잘 만들어. 주제: "{{subject}}"
📌 출력 형식: 한 문장 (100자 이내)
📌 문체 지시: 간결하고 임팩트 있게
📎 출력 방식: X/Twitter`
    },
    '이메일 작성': {
      '친근한': `너는 따뜻한 고객 상담 담당자야. 주제: "{{subject}}"
📌 출력 형식: 인사 / 본문 / 마무리 인사
📌 문체 지시: 친절하고 부드러운 말투
📎 출력 방식: 이메일`,
      '전문적인': `너는 비즈니스 커뮤니케이션 전문가야. 주제: "{{subject}}"
📌 출력 형식: 제목 / 본문 / 서명
📌 문체 지시: 격식 있고 정중하게
📎 출력 방식: 텍스트`,
      '유머러스한': `너는 재치있는 메일 작성자야. 주제: "{{subject}}"
📌 출력 형식: 재미와 정보 결합
📌 문체 지시: 유머 섞인 문체
📎 출력 방식: HTML 이메일`,
      '감성적인': `너는 감사 메일을 잘 써. 주제: "{{subject}}"
📌 출력 형식: 감사 표현 / 공감 문장
📌 문체 지시: 따뜻하고 감정 담아
📎 출력 방식: 이메일`,
      '간결한': `너는 바쁜 사람을 위한 이메일을 써. 주제: "{{subject}}"
📌 출력 형식: 제목 / 핵심 본문 2~3줄
📌 문체 지시: 직설적이고 효율적으로
📎 출력 방식: 텍스트`
    },
    '스토리텔링': {
      '친근한': `너는 이야기 잘하는 사람처럼 써야 해. 주제: "{{subject}}"
📌 출력 형식: 도입 / 전개 / 결말
📌 문체 지시: 편안하고 구어체
📎 출력 방식: 블로그`,
      '전문적인': `너는 브랜드 서사를 쓰는 전략가야. 주제: "{{subject}}"
📌 출력 형식: 브랜드 배경 / 전환 / 메시지
📌 문체 지시: 구조적이고 설득력 있게
📎 출력 방식: 발표자료`,
      '유머러스한': `너는 개그 스토리텔러야. 주제: "{{subject}}"
📌 출력 형식: 상황 / 반전 / 오마주
📌 문체 지시: 유머와 위트 중심
📎 출력 방식: 웹 콘텐츠`,
      '감성적인': `너는 감정 서사 작가야. 주제: "{{subject}}"
📌 출력 형식: 감정 흐름 중심 서사
📌 문체 지시: 서정적이고 묘사 많은 문장
📎 출력 방식: 브런치`,
      '간결한': `너는 3문장 스토리 전문가야. 주제: "{{subject}}"
📌 출력 형식: 시작 / 전개 / 마무리 한 줄씩
📌 문체 지시: 짧고 강렬하게
📎 출력 방식: 쇼츠 or 트위터`
    }
  };

  const generatePrompt = () => {
    const base = templates[goal]?.[style] ?? '해당 조합의 프롬프트가 준비되지 않았습니다.';
    const filled = base.replaceAll('{{subject}}', subject);
    setPrompt(filled);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    alert('프롬프트가 복사되었습니다!');
  };

  const savePrompt = () => {
    const blob = new Blob([prompt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompt.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h2>🎯 AI 프롬프트 추천기</h2>
      <label>창작 목적</label>
      <select value={goal} onChange={(e) => setGoal(e.target.value)}>
        {Object.keys(templates).map((g) => (
          <option key={g}>{g}</option>
        ))}
      </select>
      <label>스타일</label>
      <select value={style} onChange={(e) => setStyle(e.target.value)}>
        {Object.keys(templates[goal] || {}).map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <label>주제 입력</label>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="예: 인공지능 시대의 작가"
      />
      <button onClick={generatePrompt}>프롬프트 생성</button>
      <textarea readOnly value={prompt} />
      <div className="copy-save">
        <button onClick={copyPrompt}>복사하기</button>
        <button onClick={savePrompt}>저장하기</button>
      </div>
    </div>
  );
}
