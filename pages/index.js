import { useRouter } from 'next/router'
import {
  Error,
  Image,
  ItemGroup,
  SearchBar,
  TitledTextBox,
} from '@scientist-softserv/webstore-component-library'
import hero from '../assets/img/hero.jpg'
import {
  configureErrors,
  configureServices,
  useAllWares,
  TEXT,
  TITLE,
} from '../utils'

const Home = () => {
  const router = useRouter()
  const { wares, isLoading, isError } = useAllWares()
  const featuredServices = configureServices({ data: wares, path: '/services' })?.slice(0, 3)
  const handleOnSubmit = ({ value }) => router.push(
    { pathname: '/browse', query: { q: value } },
    (value.length > 0 ? `/browse?q=${value}` : '/browse')
  )

  if (isError) {
    const { errorTitle, errorText, variant } = configureErrors([isError])
    return (
      <Error variant={variant} errorTitle={errorTitle} errorText={errorText} router={router}/>
    )
  }

  return (
    <>
      <Image
        alt='DNA chain'
        src={hero.src}
        height={400}
        width='100%'
        style={{ objectFit: 'cover' }}
      />
      <div className='container'>
        <SearchBar onSubmit={handleOnSubmit} />
        <TitledTextBox title={TITLE} text={TEXT} />
        <ItemGroup
          items={featuredServices}
          isLoading={isLoading}
          withTitleLink={true}
        />
      </div>
    </>
  )
}

export default Home
