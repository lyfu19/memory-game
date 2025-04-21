function Card({image, name, handleClick}) {
  return (
    <div onClick={handleClick} className="card">
      <img src={image} alt={name} />
      <p>{name}</p>
    </div>
  );
}

export default Card;