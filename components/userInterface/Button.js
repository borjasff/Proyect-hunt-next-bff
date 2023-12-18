import styled from "@emotion/styled";

const Button = styled.div`
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: 0.8rem 2rem;
    margin: 2rem auto;
    text-align: center;
    background-color: ${props => props.bgColor ? '#D4552F' : 'white'};
    color: ${props => props.bgColor ? 'white' : '#000'};

    &:hover {
        cursor: pointer;
    }
`;

export default Button;