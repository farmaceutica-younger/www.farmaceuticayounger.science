import styled from "@emotion/styled";
import { Ticket } from "components/ticket";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

interface Query {
  date: string;
  location: string;
  eventName: string;
  avatar: string;
  name: string;
  role: string;
  ticketNum: number;
}

const TicketPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { date, location, eventName, avatar, name, role, ticketNum } = props;

  return (
    <div className="p-[20px]">
      <Box className="bg-pink-500">
        <Ticket
          event={{
            date,
            location,
            name: eventName,
          }}
          ticketNum={ticketNum}
          ticket={{
            avatar: avatar,
            name: name,
            role: role,
          }}
        />
      </Box>
    </div>
  );
};

export default TicketPage;

const Box = styled.div`
  width: 1000px;
  height: 500px;
  display: grid;
  place-content: center;
  transform: scale(2);
`;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const q = ctx.query as unknown as Query;
  return {
    props: q,
  };
};
