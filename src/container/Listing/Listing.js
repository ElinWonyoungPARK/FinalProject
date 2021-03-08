import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import Sticky from 'react-stickynode';
import Toolbar from 'components/UI/Toolbar/Toolbar';
import { Checkbox } from 'antd';
import CategotySearch from 'components/Search/CategorySearch/CategotySearch';
import { PostPlaceholder } from 'components/UI/ContentLoader/ContentLoader';
import SectionGrid from 'components/SectionGrid/SectionGrid';
import ListingMap from './ListingMap';
import FilterDrawer from 'components/Search/MobileSearchView';
import useWindowSize from 'library/hooks/useWindowSize';
import useDataApi from 'library/hooks/useDataApi';
import { SINGLE_POST_PAGE } from 'settings/constant';
import ListingWrapper, { PostsWrapper, ShowMapCheckbox } from './Listing.style';

const Listing = ({ location, history }) => {

  const [exhbnList, setExhbnList] = useState([])

  let url = '/data/hotel.json';
  const { width } = useWindowSize();
  const [showMap, setShowMap] = useState(false);
  const { data, loading, loadMoreData, total, limit } = useDataApi(url);
  let columnWidth = [1 / 1, 1 / 2, 1 / 3, 1 / 4, 1 / 5];
  if (location.search) {
    url += location.search;
  }
  if (showMap) {
    columnWidth = [1 / 1, 1 / 2, 1 / 2, 1 / 2, 1 / 3];
  }
  const handleMapToggle = () => {
    setShowMap((showMap) => !showMap);
  };
  const URL = '/exhbns/all'
  useEffect(() => {
    axios.get(URL, )
    .then((resp) => {
      alert(`성공`)
      setExhbnList(resp.data)
    })
    .catch((err) => {
      alert(`실패`)
      throw err;
    })
  }, [])

  return (
    <>
    <ul>
    {exhbnList.map(i => (
      <li
        key = {i.exhbnNum}
      >
        {i.exhbnTitle}
      </li>
    ))}
    </ul>
    <ListingWrapper>
      <Sticky top={82} innerZ={999} activeClass="isHeaderSticky">
        <Toolbar
          left={
            width > 991 ? (
              <CategotySearch history={history} location={location} />
            ) : (
              <FilterDrawer history={history} location={location} />
            )
          }
          right={
            <ShowMapCheckbox>
              <Checkbox defaultChecked={false} onChange={handleMapToggle}>
                Show map
              </Checkbox>
            </ShowMapCheckbox>
          }
        />
      </Sticky>

      <Fragment>
        <PostsWrapper className={width > 767 && showMap ? 'col-12' : 'col-24'}>
          <SectionGrid
            link={SINGLE_POST_PAGE}
            columnWidth={columnWidth}
            data={data}
            totalItem={total.length}
            loading={loading}
            limit={limit}
            handleLoadMore={loadMoreData}
            placeholder={<PostPlaceholder />}
          />
        </PostsWrapper>

        {showMap && <ListingMap />}
      </Fragment>
    </ListingWrapper>
    </>
  );
}
export default Listing;