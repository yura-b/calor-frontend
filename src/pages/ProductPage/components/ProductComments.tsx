import { FC } from 'react';
import { Divider, Grid, Paper } from "@material-ui/core";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { getReview } from "@/api/reviews";
import Loader from "@/components/ui/Loader";
import moment from 'moment';

const ProductComments: FC = () => {
  const { id } = useParams();
  const { data: review, isLoading, isError } = useQuery(['products', getReview], () => getReview(id), {
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  console.log(review?.data, 'review?.data')
  return (
    isLoading ? (
      <Loader />
    ) : (
      <>
        {
          review?.data.map((review) => (
            <Paper className="px-[40px] py-[20px] w-full">
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <h4 className="m-0 text-left">{`${review.firstName} ${review.secondName}`}</h4>
                  <p className="text-left">{review.experience}</p>
                  <p className="text-left text-grayLight">
                    {moment(review.date).fromNow()}
                  </p>
                </Grid>
              </Grid>
              <Divider className="px-[40px]" variant="fullWidth" />
            </Paper>
          ))
        }
      </>
    ))
}

export default ProductComments;