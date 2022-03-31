import styled from 'styled-components';

export const TableCanvas = styled.div`
  overflow: auto;
  max-height: 64vh;
  border-radius: 16px;
  margin-top: 2rem;
`;

export const Table = styled.table`
  border-spacing: 0;
  width: 100%;

  thead { 
    background: #18274d;
    color: #ffffff;
    position: sticky;
    top: 0;

    z-index: 9;
    
    tr {
      th { 
        padding: 1.5rem 0.5rem;
        min-width: 8rem;
        text-align: center;
        height: 3rem;
        vertical-align: bottom;
        font-weight: 600;
      }

      th:first-child {
        padding-left: 1.5rem;
        text-align: start;
        width: 100%;
      }
      th:last-child {
        min-width: 9rem;
        padding-right: 1.5rem;
      }
    }
  }

  tbody {
    border-spacing: 1rem;
    
    tr{
      background: #eeeeee;

      &:hover {
        filter: brightness(0.95)
      }

      td:nth-child(6) {
      background: #e2e2e2;
    }
    }

    tr:last-of-type > td {
      padding-bottom: 1rem;
    }
    
    td {
      padding: 0.5rem;
      text-align: center;
      justify-self: center;

      & > input:first-child:last-child {
        margin: 0 auto;
      }
    }

    td:first-child {
      padding-left: 1.5rem;
      text-align: start;
    }

    td:last-child {
      padding-right: 1.5rem;
    }

  }
`;

export const TableEmpty = styled.div`
  margin-top: 2rem;
  width: 100%;
  background: #eeeeee;
  padding: 2rem;
  border-radius: 16px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #666;
  gap: 1rem;
`;