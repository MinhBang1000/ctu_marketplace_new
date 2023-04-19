import { useHistory } from 'react-router-dom';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    header: {
      padding: "6px 0",
    },
    headerBackground: {
      backgroundColor: '#0065C1',
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    search: {
      position: 'relative',
    //   borderRadius: 50,
      backgroundColor: alpha(theme.palette.common.white, 0.95),
    //   '&:hover': {
    //     backgroundColor: alpha(theme.palette.common.white, 0.75),
    //   },
      color: 'black',
  
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: '3rem',
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const history = useHistory();
    const { t } = useTranslation('common');

    const classes = useStyles();

    const onSubmit = (e, value) => {
        setSearchQuery(value)
        history.push(`?s=${value}`);
        e.preventDefault();
    };
    

    return (
        <form
            action="/"
            method="get"
            autoComplete="off"
            onSubmit={onSubmit}
        >

             <div className={`${classes.search} rounded-3 row`}>
                <div className={`${classes.searchIcon} col-sm-3`}>
                    <SearchIcon />
                </div>
                  <input
                      value={searchQuery}
                      onInput={(e) => onSubmit(e, e.target.value)}
                      type="text"
                      id="header-search"
                      placeholder={t('search.placeholder')}
                      name="s"
                      className={`text-black-50 ${classes.inputInput} rounded-3 col-sm-9`}
                      // classes={{
                      //     root: classes.inputRoot,
                      //     input: classes.inputInput,
                      // }}
                  />
          </div>
        </form>
    );
};

export default SearchBar;