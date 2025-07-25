import React, { useState, useEffect } from 'react'
import { TextFieldVariants } from '@mui/material'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import env from '@/config/env.config'
import * as CountryService from '@/services/CountryService'
import * as helper from '@/utils/helper'
import MultipleSelect from './MultipleSelect'

interface CountrySelectListProps {
  value?: movininTypes.Country | movininTypes.Country[] | null
  multiple?: boolean
  label?: string
  required?: boolean
  variant?: TextFieldVariants
  onChange?: (values: movininTypes.Option[]) => void
}

const CountrySelectList = ({
  value,
  multiple,
  label,
  required,
  variant,
  onChange
}: CountrySelectListProps) => {
  const [init, setInit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState<movininTypes.Country[]>([])
  const [fetch, setFetch] = useState(true)
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<movininTypes.Country[]>([])

  useEffect(() => {
    const _value = multiple ? value as movininTypes.Country[] : [value as movininTypes.Country]

    // if (value && !movininHelper.arrayEqual(selectedOptions, _value)) {
    //   setSelectedOptions(_value)
    // }

    if (value && !movininHelper.arrayEqual(selectedOptions, _value)) {
      setSelectedOptions(_value)
    }

    if ((value === null || (Array.isArray(value) && value.length === 0)) && selectedOptions.length > 0) {
      setSelectedOptions([])
    }
  }, [value, multiple, selectedOptions])

  const fetchData = async (_page: number, _keyword: string, onFetch?: movininTypes.DataEvent<movininTypes.Country>) => {
    try {
      if (fetch || _page === 1) {
        setLoading(true)

        const data = await CountryService.getCountries(_keyword, _page, env.PAGE_SIZE)
        const _data = data && data.length > 0 ? data[0] : { pageInfo: { totalRecord: 0 }, resultData: [] }
        if (!_data) {
          return
        }
        const totalRecords = Array.isArray(_data.pageInfo) && _data.pageInfo.length > 0 ? _data.pageInfo[0].totalRecords : 0
        const _rows = _page === 1 ? _data.resultData : [...rows, ..._data.resultData]

        setRows(_rows)
        setFetch(_data.resultData.length > 0)

        if (onFetch) {
          onFetch({ rows: _data.resultData, rowCount: totalRecords })
        }
      }
    } catch (err) {
      helper.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (values: movininTypes.Option[]) => {
    if (onChange) {
      onChange(values)
    }
  }

  return (
    <MultipleSelect
      loading={loading}
      label={label || ''}
      callbackFromMultipleSelect={handleChange}
      options={rows}
      selectedOptions={selectedOptions}
      required={required || false}
      multiple={multiple}
      type={movininTypes.RecordType.Country}
      variant={variant || 'standard'}
      ListboxProps={{
        onScroll: (event) => {
          const listboxNode = event.currentTarget
          if (fetch && !loading && listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - env.PAGE_OFFSET) {
            const p = page + 1
            setPage(p)
            fetchData(p, keyword)
          }
        },
      }}
      onFocus={() => {
        if (!init) {
          const p = 1
          setRows([])
          setPage(p)
          fetchData(p, keyword, () => {
            setInit(true)
          })
        }
      }}
      onInputChange={(event) => {
        const _value = (event && event.target && 'value' in event.target && event.target.value as string) || ''

        // if (event.target.type === 'text' && value !== keyword) {
        if (_value !== keyword) {
          setRows([])
          setPage(1)
          setKeyword(_value)
          fetchData(1, _value)
        }
      }}
      onClear={() => {
        setRows([])
        setPage(1)
        setKeyword('')
        setFetch(true)
        fetchData(1, '')
      }}
    />
  )
}

export default CountrySelectList
