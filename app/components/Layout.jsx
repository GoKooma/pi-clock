import React from 'react';
import styled from 'styled-components'

const Theme = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  background: #755139;
  color: #F2EDD7;
`

const Layout = ({ children }) => (
  <Theme>
    {children}
  </Theme>
)

export default Layout