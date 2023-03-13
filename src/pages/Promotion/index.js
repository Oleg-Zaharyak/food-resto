import React, { useState } from "react";
import style from "./styles.module.scss";
import { Button } from "../../components/Button";
import { useUserAdmin } from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { PromotionCard } from "../../components/PromotionCard";
import { AddPromotionModal } from "../../components/AddPromotion";

export const Promotion = () => {
  const navigate = useNavigate();
  const { adminLogin } = useUserAdmin();
  const [showAddPromotion, setShowPromotion] = useState(false);

  return (
    <div className={style.main_container}>
      <div className={style.header}>
        <div className={style.header_text}>Акції:</div>
        {adminLogin ? (
          <Button title="Додати акцію" onClick={() => setShowPromotion(true)} />
        ) : null}
      </div>
      <div className={style.promotion_container}>
        <PromotionCard />
      </div>
      <div className={style.no_promotion}>
        <div className={style.no_promotion_text}>На даний момент акцій немає</div>
        <Button title="Повернутись на головну" onClick={() => navigate("/")} />
      </div>
      {showAddPromotion ? (
        <AddPromotionModal
          title="Ld"
          showPromotionModal={(el) => setShowPromotion(el)}
        />
      ) : null}
    </div>
  );
};
