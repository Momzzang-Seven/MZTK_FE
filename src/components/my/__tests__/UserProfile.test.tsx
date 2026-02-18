import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserProfile } from '../UserProfile';

describe('UserProfile', () => {
  it('기본 props로 렌더링된다', () => {
    render(<UserProfile username="홍길동" levelLabel="User Level: 10" />);
    
    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('User Level: 10')).toBeInTheDocument();
  });

  it('username prop이 표시된다', () => {
    render(<UserProfile username="테스트유저" levelLabel="Level 5" />);
    
    expect(screen.getByText('테스트유저')).toBeInTheDocument();
  });

  it('levelLabel prop이 표시된다', () => {
    render(<UserProfile username="유저" levelLabel="레벨 15" />);
    
    expect(screen.getByText('레벨 15')).toBeInTheDocument();
  });

  it('기본값이 사용된다', () => {
    render(<UserProfile />);
    
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('User Level: 5')).toBeInTheDocument();
  });

  it('프로필 원이 렌더링된다', () => {
    const { container } = render(<UserProfile />);
    
    const profileCircle = container.querySelector('.rounded-full.bg-main.w-16.h-16');
    expect(profileCircle).toBeInTheDocument();
  });

  it('올바른 스타일 클래스가 적용된다', () => {
    const { container } = render(<UserProfile username="유저" levelLabel="레벨 1" />);
    
    const wrapper = container.querySelector('.flex.flex-row.justify-start.items-center');
    expect(wrapper).toBeInTheDocument();
    
    const username = screen.getByText('유저');
    expect(username).toHaveClass('text-xl', 'font-bold');
  });
});
