import NextHead from 'next/head'

export interface HeadProps {
  title: string
  content: string
}

export const Head: React.FC<HeadProps> = ({ title, content }) => (
  <NextHead>
    <title>{title}</title>
    <meta name='description' content={content} />
    <link rel='icon' href='/favicon.ico' />
  </NextHead>
)

export default Head
