import React, { ReactNode } from 'react';
import styled from 'styled-components';

const TitleAndItemWrap = styled.div`
  margin-right: 30px;

  select {
    font-size: 15px;
    width: 60px;
  }

  span {
    font-size: 15px;
    margin-left: 5px;
  }
`;

export const SubTitle = styled.div`
  font-size: 17px;
  margin: 15px 0 10px;
`;

const Items = styled.div`
  display: flex;
  align-items: center;
`;

interface Props {
  title: string;
  unit?: string;
  children: ReactNode;
}

function TitleAndItem({ title, unit, children }: Props) {
  return (
    <TitleAndItemWrap>
      <SubTitle>{title}</SubTitle>
      <Items>
        {children} {unit && <span>{unit}</span>}
      </Items>
    </TitleAndItemWrap>
  );
}

export default TitleAndItem;
