import CatItem from "./CatItem";

const Favorites = ({favorites}) => { 
  if(favorites.length === 0) {
    return <div>사진위 하트를 눌러 고양이 사진을 저장해보세요!</div>;
  }

  return(
    <ul className="favorites">
      {favorites.map((cat) => (  
        <CatItem img={cat} key={cat} />
      ))}
    </ul>
  );
};

export default Favorites;