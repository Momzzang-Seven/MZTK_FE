import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MySectionCard } from '../MySectionCard';

describe('MySectionCard', () => {
  it('children이 렌더링된다', () => {
    render(
      <MySectionCard>
        <div>테스트 컨텐츠</div>
      </MySectionCard>
    );
    
    expect(screen.getByText('테스트 컨텐츠')).toBeInTheDocument();
  });

  it('기본 className이 적용된다', () => {
    const { container } = render(
      <MySectionCard>
        <div>컨텐츠</div>
      </MySectionCard>
    );
    
    const card = container.querySelector('.flex.flex-col.rounded-lg.p-4');
    expect(card).toBeInTheDocument();
  });

  it('커스텀 className이 병합된다', () => {
    const { container } = render(
      <MySectionCard className="custom-class">
        <div>컨텐츠</div>
      </MySectionCard>
    );
    
    const card = container.querySelector('.custom-class');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('flex', 'flex-col', 'rounded-lg', 'custom-class');
  });

  it('기본 스타일이 확인된다', () => {
    const { container } = render(
      <MySectionCard>
        <div>컨텐츠</div>
      </MySectionCard>
    );
    
    const card = container.querySelector('.w-full.h-fit.items-center.justify-center');
    expect(card).toBeInTheDocument();
  });

  it('border 및 배경색이 확인된다', () => {
    const { container } = render(
      <MySectionCard>
        <div>컨텐츠</div>
      </MySectionCard>
    );
    
    const card = container.querySelector('.bg-white.border.border-main.border-2');
    expect(card).toBeInTheDocument();
  });
});
