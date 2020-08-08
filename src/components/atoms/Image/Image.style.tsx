import styled from 'styled-components';

type StyledImageProps = {
  width: string;
  respWidth: string;
}

export const StyledImage = styled.img`
  width: ${({ width }: StyledImageProps) => (width || '8rem')};

  @media only screen and (max-width: 600px) {
    width: ${({ respWidth }) => (respWidth || '4rem')};
  }
`;
