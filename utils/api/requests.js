import useSWR from 'swr'
import {
  configureDocuments,
  configureMessages,
  configureRequests,
} from './configurations'
import { fetcher, posting } from './base'

export const useAllRequests = () => {
  const { data, error } = useSWR(`/quote_groups/mine.json`, fetcher)
  const requests = data && configureRequests({ data: data.quote_group_refs, path: '/requests' })

  return {
    requests,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useOneRequest = (id) => {
  const { data, error } = useSWR(`/quote_groups/${id}.json`, fetcher)
  let request = data && configureRequests({ data, path: '/requests' })[0]
  if (request) {
    request = {
      ...request,
      createdAt: request.createdAt.slice(0, 12),
      proposedDeadline: request.proposedDeadline.slice(0, 12),
    }
  }

  return {
    request,
    isLoadingRequest: !error && !data,
    isRequestError: error,
  }
}

export const useAllSOWs = (id, requestIdentifier) => {
  const { data, error } = useSWR(`/quote_groups/${id}/proposals.json`, fetcher)
  let allSOWs
  if (data) {
    allSOWs = configureDocuments(data, requestIdentifier)
  }

  return {
    allSOWs,
    isLoadingSOWs: !error && !data,
    isSOWError: error,
  }
}

export const useAllMessages = (id) => {
  const { data, error } = useSWR(`/quote_groups/${id}/notes.json`, fetcher)
  let messages
  if (data) messages = configureMessages(data.notes)

  return {
    messages,
    isLoadingMessages: !error && !data,
    isMessageError: error,
  }
}

export const sendMessage = ({ id, message, files }) => {
  /* eslint-disable camelcase */
  const note = {
    body: message,
    quoted_ware_ids: [id],
    data_files: files,
  }
  /* eslint-enable camelcase */

  posting(`/quote_groups/${id}/notes.json`, note)
}

export const initializeRequest = (id) => {
  const { data, error } = useSWR(`/wares/${id}/quote_groups.json`, fetcher)
  const acceptable_properties = ['quote_information', 'description', 'timeline']

  let properties_array = []
  let filtered_properties = []
  let required_fields = []
  if (data) {
    properties_array = Object.entries(data?.dynamic_form.schema.properties)
    filtered_properties = properties_array.filter(prop => acceptable_properties.includes(prop[0]))
    required_fields = filtered_properties.map(prop => { if (prop[1].required) return prop[0] })
  }

  // TODO:(alishaevn): this may need to be altered for a blank request
  return {
    dynamicForm: {
      description: '', // TODO:(alishaevn): the description at this endpoint is just a list of questions. the empty string momentarily displays error text on the page
      properties: Object.fromEntries(filtered_properties),
      required_fields,
      title: data?.name,
      type: data?.dynamic_form.schema.type,
    },
    isLoadingInitialRequest: !error && !data,
    isInitialRequestError: error,
  }
}
