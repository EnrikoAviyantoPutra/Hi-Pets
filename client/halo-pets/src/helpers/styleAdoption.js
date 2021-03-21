import { makeStyles } from '@material-ui/core'

const useStylesAdoption = makeStyles((theme) => ({
  gridList: {
    width: '100%',
    height: 'auto',
    overflow: 'hidden',
  },
  gridListTile: {
    // cursor: 'pointer',
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    transition: theme.transitions.create("transform 0.15s ease-in-out")
  },
  button: {
    margin: theme.spacing(1),
  },
  // fab: {
  //   position: 'absolute',
  //   bottom: theme.spacing(2),
  //   right: theme.spacing(2),
  // },
}))

export default useStylesAdoption