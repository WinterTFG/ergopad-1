import { TextField, Icon, Paper, InputBase } from "@mui/material";
import theme from "../styles/theme";
import { useState } from "react";

const Search = () => {
    const [search, setSearch] = useState('');
    const handleChange = (e) => {
      setSearch(e.target.value);
    };

    return (
        <>
            {/* <TextField
                placeholder="Search"
                color="background" 
                id="search"
                size="small"
                sx={{
                    background: theme.palette.greyButton.background,
                    width: {
                        md: '70%',
                        xs: '90%'
                    }
                }}
                value={search}
                onChange={handleChange}
            > 
                <Icon>search</Icon>
            </TextField> */}


            <Paper
                component="form"
                sx={{ 
                    p: '8px', 
                    mt: '1rem',
                    display: 'flex', 
                    alignItems: 'center', 
                    background: theme.palette.greyButton.background,
                    border: '1px solid',
                    borderColor: 'rgba(82,82,90,1)',
                    width: {
                        md: '60%',
                        xs: '90%'
                    },
                    color: theme.palette.text.primary
                }}
            >

            <Icon sx={{ color: theme.palette.text.secondary }}>search</Icon>

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
                
                value={search}
                onChange={handleChange}
            />

</Paper>

            
        </>
    )
}

export default Search;