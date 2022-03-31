import styled from 'styled-components';

export const Form = styled.form`
  position: sticky;
  top: 1rem;
  z-index: 10;
`;

export const Input = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  input, select {
    width: 100%; 
    height: 3rem;
    margin-top: 0.5rem;
    border-radius: 8px;
    border: 2px solid #ffffff66;
    background: rgba(0, 0, 0, 0.3);
    color: #ffffff;
  }

  input::placeholder, select::placeholder {
    color: #ffffff66;
  }

  option {
    background: #444;
  }

  input:focus, select:focus {
    border-color: #ffcc41;
    outline-color: #ffcc4166;
    outline-width: 4px;
    outline-style: solid;
  }
`;

export const Checkbox = styled.div`
  display: flex;
  margin-bottom: 0.75rem;

  input[type="checkbox"] {
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
  }
`;

export const Button = styled.button`
  border: 2px solid transparent;
  border-radius: 8px;
  background: #ffffff;
  color: #1c377c;
  padding: 0 1rem;
  text-transform: lowercase;
  font-weight: bold;
  width: 100%;
  grid-column: span 2;

  cursor: pointer;

  height: 3rem;

  &:focus {
    border-color: #ffcc41;
    outline-color: #ffcc4166;
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