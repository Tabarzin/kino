import * as React from "react";
import { Flex, Layout, Row, Col } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { moviesStore } from "../../stores/MoviesStore";
import MovieCard from "../../components/MovieCard";

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
  marginBottom: "20px",
};

const contentStyle: React.CSSProperties = {
  padding: "10px",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#0958d9",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
  maxWidth: "1440px",
};

const MoviesPage: React.FC<MoviesPageProps> = ({}) => {
  useEffect(() => {
    moviesStore.fetchMovies();
  }, []);

  return (
    <div>
      <Flex gap="middle" wrap="wrap">
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>КИНОСПРАВОЧНИК</Header>
          <Content style={contentStyle}>
            {moviesStore.isLoading ? (
              <p>Loading...</p>
            ) : (
              <InfiniteScroll
                dataLength={moviesStore.movies.length}
                next={moviesStore.fetchMovies}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                <Row gutter={[16, 16]}>
                  {moviesStore.movies.map((movie) => (
                    <Col key={movie.id} span={6} xs={24} sm={12} md={8} lg={6}>
                      <MovieCard
                        id={movie.id}
                        name={movie.name}
                        year={movie.year}
                        description={movie.description}
                        shortDescription={movie.shortDescription}
                        rating={movie.rating.imdb}
                        movieLength={movie.movieLength}
                        poster={movie.poster.url}
                        genres={movie.genres}
                        countries={movie.countries}
                      />
                    </Col>
                  ))}
                </Row>
              </InfiniteScroll>
            )}
          </Content>
          <Content style={contentStyle}>Content</Content>
          <Footer style={footerStyle}>Footer</Footer>
        </Layout>
      </Flex>
    </div>
  );
};

export default observer(MoviesPage);
