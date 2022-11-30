import React from "react";
import "../styles/Review.css";

const ReviewPengajar = () => {
  return (
    <div className="review-pengajar">
      <div className="review-container">
        <div className="card-review-wrapper">
          <h3 className="title-review">Nilai Pengajar</h3>
          <div className="second-card-wrapper">
            <div className="profile-review">
              <img
                src="https://pbs.twimg.com/profile_images/1488841869505499139/2OnTM30Z_400x400.jpg"
                alt=""
              />
            </div>
            <div className="rating-review">
              <h3 className="name">Fitron Ansori</h3>
              <span className="star-rating">★★★★★</span>
            </div>
            <div className="comment">
              <h4>Berikan Komentar</h4>
              <textarea
                name="comment"
                id=""
                placeholder="Ketikkan komentarmu di sini..."
              ></textarea>
            </div>
          </div>
          <div className="btn-wrapper">
            <button className="btn-send-review" type="submit">
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPengajar;
