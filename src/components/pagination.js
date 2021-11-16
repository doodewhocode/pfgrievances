import React, { Component } from 'react'

class Pagination extends Component {
   /*  static propTypes = {
        items: this.propTypes.array.isRequired,
        onChangePage: this.propTypes.func.isRequired,
        initialPage: this.propTypes.number
    } */
    static defaultProps = {
        initialPage: 1
    }
    constructor(props) {
        super(props)
        this.state = { pager: {} }
    }

    componentDidMount() {
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(this.props.items) !== JSON.stringify(prevProps.items)) {
            this.setPage(this.props.initialPage)
        }
    }

    setPage(page) {
        var items = this.props.items
        var pager = this.state.pager

        if (page < 1 || (page > pager.totalPages && page > items.length)) {
            this.props.onChangePage(items)
            return
        }

        pager = this.getPager(items.length, page)

        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1)

        this.setState({ pager: pager })

        this.props.onChangePage(pageOfItems)
    }

    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1
        pageSize = pageSize || 1
        var totalPage = Math.ceil(totalItems / pageSize)
        var startPage, endPage
        if (totalPage <= 12) {
            startPage = 1
            endPage = totalPage
        } else {
            if (currentPage <= 6) {
                startPage = 1
                endPage = 10
            } else if (currentPage + 4 >= totalPage) {
                startPage = totalPage - 9
                endPage = totalPage
            } else {
                startPage = currentPage - 5
                endPage = currentPage + 4
            }
        }

        var startIndex = (currentPage - 1) * pageSize
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)

        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i)

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPage,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        }
    }

    render() {
        var pager = this.state.pager;
        if (!pager.pages || pager.pages.length <= 1) {
            return null
        }

        return (
            <nav aria-label='...'>
                <ul className='pagination'>
                    <li className={'page-item ' + (pager.currentPage === 1 ? 'disabled' : '')}>
                        <a className={'page-link'} onClick={() => this.setPage(1)}>First</a>
                    </li>
                    <li className={'page-item ' + (pager.currentPage === 1 ? 'disabled' : '')}>
                        <a className={'page-link'} onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                    </li>
                    {pager.pages.map((page, index) => 
                        <li key={index} className={'page-item ' + (pager.currentPage === page ? 'active' : '')}>
                            <a className='page-link' onClick={() => this.setPage(page)}>{page}</a>
                        </li>
                    )}
                    <li className={'page-item ' + (pager.currentPage === pager.totalPages ? 'disabled' : '')}>
                        <a className={'page-link'} onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                    </li>
                    <li className={'page-item ' + (pager.currentPage === pager.totalPages ? 'disabled' : '')}>
                        <a className={'page-link'} onClick={() => this.setPage(pager.totalPages)}>Last</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Pagination