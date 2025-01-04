import { AppBar, MenuItem, styled, Toolbar } from "@mui/material"




const NavBar = () => {

  const StyledToobar = styled(Toolbar)(({ theme })=> ({
      display: "flex",
      justifyContent: "center",
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
  }))

  const StyledMenItem = styled(MenuItem)(({ theme })=> ({
    backgroundColor: "transparent",
    '&:hover': {
            transition: "all .3s",
            cursor: "pointer",
            color: theme.palette.secondary.light,
            borderRadius: "10%"
        }
  }))

    return (
      <>
        <AppBar position="absolute">
          <StyledToobar>
            <StyledMenItem>About</StyledMenItem>
            <StyledMenItem>Learn</StyledMenItem>
            <StyledMenItem>Portfolio</StyledMenItem>
            <StyledMenItem>Blog</StyledMenItem>
            <StyledMenItem>Contact</StyledMenItem>
          </StyledToobar>
        </AppBar>
      </>
    )
  }
  
  export default NavBar
  