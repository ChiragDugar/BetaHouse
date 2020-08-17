import React, { Component } from 'react';
import Pagination from 'react-paginating';
 
const fruits = [
  ['apple', 'orange' , 'blueberry', 'blueberry', 'blueberry'],
  ['banana', 'avocado'],
  ['coconut', 'blueberry'],
  ['payaya', 'peach'],
  ['pear', 'plum']
];
const limit = 6;
const pageCount = 3;
const total = fruits.length * limit;
 
export default class HostelListingPaginating extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1
    };
  }
 
  handlePageChange = (page, e) => {
    this.setState({
      currentPage: page
    });
  };
 
  render() {
    const { currentPage } = this.state;
    return (
      <div>
        <ul>
          {fruits[currentPage - 1].map(item => <li key={item}>{item}</li>)}
        </ul>
        <Pagination
          className="bg-red"
          total={total}
          limit={limit}
          pageCount={pageCount}
          currentPage={currentPage}
        >
          {({
            pages,
            currentPage,
            hasNextPage,
            hasPreviousPage,
            previousPage,
            nextPage,
            totalPages,
            getPageItemProps
          }) => (
            <div>
              <button
                {...getPageItemProps({
                  pageValue: 1,
                  onPageChange: this.handlePageChange
                })}
              >
                first
              </button>
 
              {hasPreviousPage && (
                <button
                  {...getPageItemProps({
                    pageValue: previousPage,
                    onPageChange: this.handlePageChange
                  })}
                >
                  {'<'}
                </button>
              )}
 
              {pages.map(page => {
                let activePage = null;
                if (currentPage === page) {
                  activePage = { backgroundColor: '#fdce09' };
                }
                return (
                  <button
                    {...getPageItemProps({
                      pageValue: page,
                      key: page,
                      style: activePage,
                      onPageChange: this.handlePageChange
                    })}
                  >
                    {page}
                  </button>
                );
              })}
 
              {hasNextPage && (
                <button
                  {...getPageItemProps({
                    pageValue: nextPage,
                    onPageChange: this.handlePageChange
                  })}
                >
                  {'>'}
                </button>
              )}
 
              <button
                {...getPageItemProps({
                  pageValue: totalPages,
                  onPageChange: this.handlePageChange
                })}
              >
                last
              </button>
            </div>
          )}
        </Pagination>
      </div>
    );
  }
}