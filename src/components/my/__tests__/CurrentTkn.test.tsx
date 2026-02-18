import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CurrentTkn } from '../CurrentTkn';

const mockUseTokenBalance = vi.fn();

vi.mock('@hooks/useTokenBalance', () => ({
  useTokenBalance: () => mockUseTokenBalance(),
}));

describe('CurrentTkn', () => {
  beforeEach(() => {
    mockUseTokenBalance.mockClear();
  });

  it('"보유 토큰" 텍스트가 렌더링된다', () => {
    mockUseTokenBalance.mockReturnValue({ balance: '1000', loading: false });
    
    render(<CurrentTkn />);
    
    expect(screen.getByText('보유 토큰')).toBeInTheDocument();
  });

  it('토큰 아이콘이 표시된다', () => {
    mockUseTokenBalance.mockReturnValue({ balance: '1000', loading: false });
    
    render(<CurrentTkn />);
    
    const icon = screen.getByAltText('tokenIcon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/icon/token.svg');
  });

  it('loading=true일 때 "..."가 표시된다', () => {
    mockUseTokenBalance.mockReturnValue({ balance: '0', loading: true });
    
    render(<CurrentTkn />);
    
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('loading=false일 때 balance가 표시된다', () => {
    mockUseTokenBalance.mockReturnValue({ balance: '5000', loading: false });
    
    render(<CurrentTkn />);
    
    expect(screen.getByText('5,000')).toBeInTheDocument();
  });

  it('balance 숫자 포맷팅이 적용된다 (toLocaleString)', () => {
    mockUseTokenBalance.mockReturnValue({ balance: '1234567', loading: false });
    
    render(<CurrentTkn />);
    
    expect(screen.getByText('1,234,567')).toBeInTheDocument();
  });

  it('"MZT" 단위가 표시된다', () => {
    mockUseTokenBalance.mockReturnValue({ balance: '1000', loading: false });
    
    render(<CurrentTkn />);
    
    expect(screen.getByText('MZT')).toBeInTheDocument();
  });

  it('그라데이션 배경 스타일이 적용된다', () => {
    mockUseTokenBalance.mockReturnValue({ balance: '1000', loading: false });
    
    const { container } = render(<CurrentTkn />);
    
    const wrapper = container.querySelector('.bg-gradient-to-r.from-main.to-sub');
    expect(wrapper).toBeInTheDocument();
  });
});
