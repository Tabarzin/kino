import { Link, useParams } from "react-router-dom";
import { moviesStore } from "../../stores/MoviesStore";
import * as React from "react";
import { Layout, Typography, Divider, Row, Col } from "antd";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  //   const movie = moviesStore.movies.find((movie) => movie.id === parseInt(id));
  const movie = id
    ? moviesStore.movies.find((movie) => movie.id === parseInt(id))
    : undefined;

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const genres = movie.genres.map((genre) => genre.name).join(", ");
  const countries = movie.countries.map((country) => country.name).join(", ");

  return (
    <Layout>
      <Header style={{ color: "#fff", textAlign: "center" }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          КИНОСПРАВОЧНИК
        </Link>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title>{movie.name}</Title>
              <Divider />
            </Col>
            <Col span={12}>
              <img
                src={movie.poster.url}
                alt={movie.name}
                style={{ maxWidth: "100%" }}
              />
            </Col>
            <Col span={12}>
              <Paragraph>
                <strong>Год:</strong> {movie.year}
              </Paragraph>
              <Paragraph>
                <strong>О фильме:</strong> {movie.description}
              </Paragraph>
              <Paragraph>
                <strong>Рейтинг IMDB:</strong> {movie.rating.imdb}
              </Paragraph>
              <Paragraph>
                <strong>Продолжительность:</strong> {movie.movieLength}
              </Paragraph>
              <Paragraph>
                <strong>Жанр:</strong> {genres}
              </Paragraph>
              <Paragraph>
                <strong>Страна:</strong> {countries}
              </Paragraph>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        &copy; 2024 Rustam Sabirov
      </Footer>
    </Layout>
  );
};

export default MoviePage;
