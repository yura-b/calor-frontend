import React from 'react';
import { Divider, Grid, Paper } from "@material-ui/core";

const ProductComments = ({ }) => {
	return (
		<>
			<Paper className="px-[40px] py-[20px]">
				<Grid container wrap="nowrap" spacing={2}>
					<Grid item>
						<h4 className="m-0 text-left">Michel Michel</h4>
						<p className="text-left">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
							luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
							Suspendisse congue vulputate lobortis. Pellentesque at interdum
							tortor. Quisque arcu quam, malesuada vel mauris et, posuere
							sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
							metus, efficitur lobortis nisi quis, molestie porttitor metus.
							Pellentesque et neque risus. Aliquam vulputate, mauris vitae
							tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
							lectus vitae ex.{" "}
						</p>
						<p className="text-left text-grayLight">
							posted 1 minute ago
						</p>
					</Grid>
				</Grid>
				<Divider className="px-[40px]" variant="fullWidth" />
			</Paper>
		</>
	)
}

export default ProductComments;