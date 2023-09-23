import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { TableCell } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[1000],
    fontSize: 18,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default StyledTableCell;
