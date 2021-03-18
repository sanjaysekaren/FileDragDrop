import styled from 'styled-components'

export const TextField = styled.input.attrs(props => ({
  type: 'text',
  size: props.size || '1em',
}))`
  border: 2px solid #4e9af1;
  width: 300px;
  padding: 10px 22px;
  margin: 8px 5px;
  box-sizing: border-box;
  border-radius: 10px;
`

export const Label = styled.label`
  font-size: 1em;
  text-align: left;
  width: 100px;
  padding: 5px 22px;
  margin: 5px 5px;
  color: #4e9af1;
  font-family: 'Garamond', serif;
`
export const SubmitButton = styled.button`
  width: 180px;
  height: 50px;
  display: inline-block;
   padding: 0.3em 1.2em;
   margin: 0 0.1em 0.1em 0;
   border: 0.16em solid rgba(255, 255, 255, 0);
   border-radius: 2em;
   box-sizing: border-box;
   text-decoration: none;
   font-family: 'Roboto', sans-serif;
   font-weight: 500;
  font-size: 24px;
   color: #ffffff;
  background-color: #4e9af1;
  &:hover {
    border-color: rgba(255, 255, 255, 1);
  }
`
export const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  color: #4e9af1;
  font-family: Georgia, serif;
`
export const Wrapper = styled.div`
  background-color: #e6e6e6;
  text-align: center;
  width: 80%;
  margin: auto;
  border: 3px solid #ffffff;
`
export const FieldWrapper = styled.div`
  text-align: center;
  padding: 5px 22px;
  margin: 5px 5px;
`
export const FileContainer = {
  margin: '2% 30%',
  width: '400px',
  height: '200px',
  backgroundColor: '#ffffff',
  border: '0.25rem dashed #99ffcc',
  borderRadius: '0.6rem',
}

export const logoStyle = {
  display: 'block',
  width: '100px',
  height: '100px',
  margin: '10% 38%',
  textAlign: 'center',
}

export const dropText = {
  fontSize: '1em',
  fontWeight: 'Bolder',
  textAlign: 'center',
  width: '100px',
  color: '#4e9af1',
  fontFamily: 'serif',
}
