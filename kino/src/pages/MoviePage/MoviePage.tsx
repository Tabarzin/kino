import { useState, useEffect } from "react";
import { Layout, Typography, Row, Col, Divider } from "antd";
import { useParams, Link } from "react-router-dom";
import { moviesStore } from "../../stores/MoviesStore";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const movie = id
    ? moviesStore.movies.find((m) => m.id === parseInt(id))
    : undefined;

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!movie) return <div>Movie not found</div>;

  const genres = movie.genres?.map((genre) => genre.name).join(", ") || "N/A";
  const countries =
    movie.countries?.map((country) => country.name).join(", ") || "N/A";

  return (
    <Layout>
      <Header style={{ color: "#fff", textAlign: "center" }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          КИНОСПРАВОЧНИК
        </Link>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <Row gutter={[16, 16]} justify={isSmallScreen ? "center" : "start"}>
            <Col span={24}>
              <Title>{movie.name}</Title>
              <Divider />
            </Col>
            <Col span={isSmallScreen ? 24 : 12}>
              <img
                src={movie.poster?.url || "https://placehold.co/400"}
                alt={movie.name}
                style={{
                  maxWidth: "100%",
                  marginBottom: isSmallScreen ? "16px" : "0",
                }}
              />
            </Col>
            <Col span={isSmallScreen ? 24 : 12}>
              <Paragraph>
                <strong>Год:</strong> {movie.year || "N/A"}
              </Paragraph>
              <Paragraph>
                <strong>О фильме:</strong> {movie.description || "N/A"}
              </Paragraph>
              <Paragraph>
                <strong>Рейтинг IMDB:</strong> {movie.rating?.imdb || "N/A"}
              </Paragraph>
              <Paragraph>
                <strong>Продолжительность:</strong> {movie.movieLength || "N/A"}
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
