import React from 'react'
import { BlankRequestForm } from 'webstore-component-library'
// TODO(alishaevn): trying to access this page without being signed in should redirect to the login page
// TODO(alishaevn): come back to this page once the initialize api function has been created. re: the thread below
// https://assaydepot.slack.com/archives/C03FZDALABG/p1670605791891109

const NewBlankRequest = () => {
  const initialState = {
    name: 'New Request',
    billingSameAsShipping: false,
    proposedDeadline: null,
    billing: {
      street: '',
      street2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      text: '',
    },
    shipping: {
      street: '',
      street2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      text: '',
    },
    data: {
      timeline: '',
      description: '',
      suppliersIdentified: 'Yes',
    },
    // TODO(alishaevn): how do we handle attachments?
  }

  const [requestForm, setRequestForm] = useState(initialState)

  /**
   * @param {object} event onChange event
   * @param {string} property dot notated string representing the property in initialValue
   * @returns {object} the updated component state
   */
  const updateRequestForm = (value, property) => {
    const [initialProperty, nestedProperty] = property.split('.')

    setRequestForm((currentState) => {
      const updatedState = nestedProperty
        ? { [initialProperty]: { ...requestForm[initialProperty], [nestedProperty]: value } }
        : { [initialProperty]: value }

      return {
        ...currentState,
        ...updatedState,
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (requestForm.billingSameAsShipping === true) {
      Object.assign(requestForm.billing, requestForm.shipping)
    }

    // TODO(alishaevn): comment this back in when it's working
    // createRequest(requestForm)
  }

  return(
    <div className='container'>
      <Title title='New Request' addClass='mt-4' />
      <form onSubmit={handleSubmit} id='new-request-form'>
        <BlankRequestForm updateRequestForm={updateRequestForm} />
        <div className='row'>
          <div className='col'>
            <ShippingDetails
              billingCountry={requestForm.billing.country}
              shippingCountry={requestForm.shipping.country}
              updateRequestForm={updateRequestForm}
            />
          </div>
          <div className='col'>
            <AdditionalInfo updateRequestForm={updateRequestForm} />
          </div>
        </div>
        <Button
          backgroundColor='primary'
          addClass='my-4 ms-auto d-block'
          label='Initiate Request'
          type='submit'
          size='large'
        />
      </form>
    </div>
  )
}

export default NewBlankRequest
