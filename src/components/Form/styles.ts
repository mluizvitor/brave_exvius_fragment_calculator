import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  border-radius: 16px;

  display: flex;
  gap: 2rem;

  @media (max-width: 1080px) {
    flex-direction: column;
  }

  label {
    color: #ffffff;
    text-align: start;
    width: 100%;
    margin-bottom: 0.25rem;
  }
`;

export const Input = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0;

  min-width: 10rem;

  justify-content: flex-end;

  @media (max-width: 600px) {
    flex: 1;
  }

  &:first-of-type {
    flex: 1;
    min-width: 16rem;
  }

  input[type='text'],
  input[type='number'],
  select {
    width: 100%;
    height: 3rem;
    border-radius: 8px;
    border: 2px solid #ffffff66;
    background: rgba(0, 0, 0, 0.3);
    color: #ffffff;

    &:hover {
      border-color: #ffffff;
      outline-color: #ffffff66;
      outline-width: 4px;
      outline-style: solid;
    }
  }

  & > div.inputNumber {
    display: flex;

    input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  input::placeholder,
  select::placeholder {
    color: #ffffff66;
  }

  option {
    background: #444;
  }

  input:focus,
  select:focus {
    border-color: #ffcc41;
    outline-color: #ffcc4166;
    outline-width: 4px;
    outline-style: solid;
  }
`;

export const Checkbox = styled.div`
  display: flex;
  min-width: 10rem;
  flex: 0;
  margin-top: 1rem;

  @media (max-width: 600px) {
    flex: 1;
  }

  input[type='checkbox'] {
    background-color: rgba(0, 0, 0, 0.3);
    border: 2px solid #ffffff66;

    &:checked {
      background-color: #ffffff;
      border-color: #ffffff;
    }
    &:checked::before {
      background-color: #1c377c;
    }

    &:focus {
      border-color: #ffcc41;
      outline-color: #ffcc4166;
    }

    &:hover {
      border-color: #ffffff;
      outline-color: #ffffff66;
      outline-width: 4px;
      outline-style: solid;
    }
  }
`;

export const Button = styled.button`
  border: 2px solid transparent;
  border-radius: 8px;
  background: #ffffff;
  color: #1c377c;
  padding: 0 0.5rem;
  text-transform: lowercase;
  font-weight: 600;
  line-height: 110%;

  display: flex;
  gap: 0.5rem;
  text-align: start;
  align-items: center;
  justify-content: flex-start;

  cursor: pointer;

  height: 3rem;

  &:focus {
    border-color: #ffcc41;
    outline-color: #ffcc4166;
    outline-width: 4px;
    outline-style: solid;
  }

  &:hover {
    border-color: #ffffff;
    outline-color: #ffffff66;
    outline-width: 4px;
    outline-style: solid;
  }
`;

export const Button2 = styled(Button)`
  &:hover {
    border-color: #1c377c;
    outline-color: #1c377c33;
    outline-width: 4px;
    outline-style: solid;
  }
`;

export const FormBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1rem;
  grid-template-columns: auto repeat(4, 9rem);

  div > input[type='checkbox'] {
    margin-bottom: 0.75rem;
  }

  @media (max-width: 1080px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const FormAssist = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 10rem);

  align-items: center;

  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }

  button {
    width: 100%;
  }
  @media (max-width: 600px) {
    button:first-of-type {
      grid-column: span 2;
    }
  }
`;

export const InputNumberButtonContainer = styled.div``;

export const InputNumberButton = styled(Button)`
  height: 1.5rem;

  &:first-of-type {
    border-radius: 0 8px 0 0;
  }

  &:last-of-type {
    border-top-width: 1px;
    border-top-color: #aaa;
    border-radius: 0 0 8px 0;
  }
`;
