import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";
import { exampleFilePaths, EXAMPLES_PATH } from "../utils/mdxUtils";

export default function Index({ examples }) {
  return (
    <>
      <article class="prose mx-auto prose-lg">
        <h1>Home Page</h1>

        <ul>
          {examples.map((example) => (
            <li key={example.filePath}>
              <Link
                as={`/examples/${example.filePath.replace(/\.mdx?$/, "")}`}
                href={`/examples/[slug]`}
              >
                <a>{example.data.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}

export function getStaticProps() {
  const examples = exampleFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(EXAMPLES_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { examples } };
}
