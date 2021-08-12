import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { getPrismicClient } from "../../services/prismic";
import Posts, { getStaticProps } from "../../pages/posts";

jest.mock("../../services/prismic");

const posts = [
  {
    slug: "test-post",
    title: "Test Post",
    excerpt: "Post de testes",
    updatedAt: "March, 10",
  },
];

describe("Page: Posts", () => {
  it("Renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my-new-post",
            data: {
              title: [
                {
                  type: "heading",
                  text: "My new post",
                },
              ],
              content: [
                {
                  type: "paragraph",
                  text: "testando",
                },
              ],
            },
            last_publication_date: "04-01-2021",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My new post",
              excerpt: "testando",
              updatedAt: "April 01, 2021",
            },
          ],
        },
      })
    );
  });
});
