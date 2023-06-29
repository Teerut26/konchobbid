import useFirestore from "@/hooks/useFirestore";
import styled from "@emotion/styled";
import { Collapse } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";

interface Props {
  user: UserInterface;
  index: number;
}

interface RankStyle {
  index: number;
}

const RankStyle = styled.div<RankStyle>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: 0.25rem;
  padding: 0.5rem 10px;
  margin: 0 1rem;
  cursor: pointer;
  border: 1px solid #e5e7eb;
  user-select: none;
  :hover {
    background-color: #f3f4f6;
  }
  ${(props) =>
    props.index === 0 &&
    `
    color: white;
    background-color: #FED914;
    :hover {
        background-color: #d9b10c;
    }
  `}
  ${(props) =>
    props.index === 1 &&
    `
    color: white;
    background-color: #A7B1CA;
    :hover {
        background-color: #7a8aa3;
    }
  `}
  ${(props) =>
    props.index === 2 &&
    `
    color: white;
    background-color: #D89143;
    :hover {
        background-color: #a46e34;
    }
  `}
  .rank {
    /* ::after {
      ${(props) => props.index === 0 && `content: "st";`}
      ${(props) => props.index === 1 && `content: "nd";`}
      ${(props) => props.index === 2 && `content: "rd";`}
    } */
  }
`;

const VoteAreaStyle = styled.div`
  margin: 0 1rem;
  display: flex;
  justify-content: flex-end;
`;

const RankCard: NextPage<Props> = ({ user, index }) => {
  const [VoteToggle, setVoteToggle] = useState(false);
  const { vote, user: userFirebase, signInWithGoogle } = useFirestore();
  const handleVoteToggle = () => setVoteToggle((pre) => !pre);

  return (
    <>
      <RankStyle index={index} onClick={handleVoteToggle}>
        <div className="rank">{index + 1}</div>
        <div className="flex-1">{user.name}</div>
        <div>{user.bid}</div>
      </RankStyle>
      <Collapse orientation="vertical" in={VoteToggle}>
        <VoteAreaStyle>
          <button
            onClick={() => {
              if (userFirebase) {
                vote(user.id!);
                handleVoteToggle();
              } else {
                signInWithGoogle();
              }
            }}
            className="btn btn bg-green-500 text-white hover:bg-green-600"
          >
            {userFirebase ? `${user.vote}/3 โหวต` : "login ก่อน"}
          </button>
        </VoteAreaStyle>
      </Collapse>
    </>
  );
};

export default RankCard;
