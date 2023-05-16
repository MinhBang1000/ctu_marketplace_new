import { useHistory } from 'react-router-dom';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslation } from 'react-i18next';
import './SearchBar.scss';

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

          {/* <div className={`${classes.search} rounded-3 row`}>
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
              />
          </div> */}

              <div className="home-search">
                <div className="home-search__search">
                    <div className="home-search__search__icon">
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="32px" height="32px"><path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"/></svg>
                    </div>
                    <div className="home-search__search__input">
                      <input
                          value={searchQuery}
                          onInput={(e) => onSubmit(e, e.target.value)}
                          type="text"
                          id="header-search"
                          placeholder={t('search.placeholder')}
                          name="s"
                          className={`text-black-50 ${classes.inputInput} rounded-3 col-sm-9`}
                      />
                    </div>
                    <div className="home-search__search__button">
                        Tìm kiếm
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;