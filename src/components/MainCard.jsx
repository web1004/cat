import "./MainCard.css";

const MainCard = ({img, onHeartClick, alreadyFavorite}) => { 
  const hearIcon = alreadyFavorite ? "💖" : "🤍";  

  return (
    <div className="main-card">
      <img src={img} alt="고양이" width="400" className="img_style"/>
      <button className="main_btn_style" onClick={onHeartClick}>{hearIcon}</button> 
    </div>
  );
};

export default MainCard;