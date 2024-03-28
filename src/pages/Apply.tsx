import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useApplyCardMutation from "@components/apply/hooks/useApplyMutation";
import Apply from "@components/apply";
import FullPageLoader from "@shared/FullPageLoader";
import usePollApplyStatus from "@components/apply/hooks/usePollApplyStatus";
import { updateApplyCard } from "@remote/apply";
import useUser from "@hooks/auth/useUser";
import { APPLY_STATUS } from "@models/apply";
import useAppliedCard from "@components/apply/hooks/useAppliedCard";
import { useAlertContext } from "@contexts/AlertContext";

export default function ApplyPage() {
  const navigate = useNavigate();
  const { open } = useAlertContext();

  const [readyToPoll, setReadyToPoll] = useState(false);

  const user = useUser();
  const { id } = useParams() as { id: string };

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied == null) {
          return;
        }

        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: "이미 발급이 완료된 카드입니다",
            onButtonClick: () => {
              navigate(-1);
            },
          });

          return;
        }

        setReadyToPoll(true);
      },
      onError: () => {},
      suspense: true,
    },
  });

  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      });
      navigate("/apply/done?success=true", {
        replace: true,
      });
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      });
      navigate("/apply/done?success=false", {
        replace: true,
      });
    },
    enabled: readyToPoll,
  });

  const { mutate, isLoading: 카드를신청중인가 } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true);
    },
    onError: () => {
      navigate(-1);
    },
  });

  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    return null;
  }

  if (readyToPoll || 카드를신청중인가) {
    return <FullPageLoader message="카드를 신청중입니다" />;
  }

  return <Apply onSubmit={mutate} />;
}
