import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledTooltip = withStyles({
  tooltipPlacementBottom: {
    margin: "4px 0",
  },
})(Tooltip);

export default StyledTooltip;
