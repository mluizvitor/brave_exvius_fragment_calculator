import styled from 'styled-components';

export const Table = styled.table`
  
  margin-top: 2rem;
  border-spacing: 0;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;

  thead { 
    background: #1c377c;
    color: #ffffff;
    
    tr {
      th { 
        padding: 1.5rem 0.5rem;
        min-width: 10rem;
        text-align: center;
        height: 3rem;
        vertical-align: bottom;
      }

      th:first-child {
        padding-left: 1.5rem;
        text-align: start;
        width: 100%;
      }
      th:last-child {
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