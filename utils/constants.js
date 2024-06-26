import logo from '../assets/svg/pv-logo-white.png'
import item from '../assets/img/microscope.png'

export const DEFAULT_WARE_IMAGE = {
  src: item.src,
  alt: 'Several rows of test tubes with a liquid being put into one.',
}

export const APP_TITLE = 'PhenoVista Biosciences | Digital Storefront'

export const ABOUT_US_TITLE = 'About Us'

/* eslint-disable max-len */
export const ABOUT_US_TEXT = `PhenoVista is a leading provider of disease-relevant, in vitro assay services across all areas of biology. Based in San Diego, California, our team of PhD-level scientists work with biopharmaceutical clients around the world to develop and implement high-content, imaging-based assays to meet their preclinical research goals. With our unique and unparalleled combination of cutting-edge cellular models and the latest quantitative-imaging technologies and data-analysis capabilities, we empower our clients with high-quality functional, structural, and mechanistic data to accelerate their discovery of novel therapeutics and vastly improve global health.`
/* eslint-enable max-len */

export const LOGO = {
  alt: 'A yellow artistic outline drawing next to the word PhenoVista',
  logoUrl: 'https://phenovista.com/',
  src: logo.src,
}

export const FOOTER_NAME = 'PhenoVista Biosciences'

// adding target: '_blank' to a link will allow it to open in a new tab.
export const FOOTER_SECTIONS = [
  {
    header: 'Service Offerings',
    links: [
      {
        name: 'Imaging & Analysis',
        url: 'https://phenovista.com/imaging-analysis',
        target: '_blank',
      },
      {
        name: 'Ready-2-Go Assays',
        url: 'https://phenovista.com/r2g-assay-services',
        target: '_blank',
      },
      {
        name: 'Cell Painting & Screening',
        url: 'https://phenovista.com/cell-painting-morphology-assay-services',
        target: '_blank',
      },
      {
        name: 'Bespoke Services',
        url: 'https://phenovista.com/bespoke-assay-services',
        target: '_blank',
      },
    ],
  },
  {
    header: 'Research Areas',
    links: [
      {
        name: 'Fibrosis',
        url: 'https://phenovista.com/fibrosis-assay-services',
        target: '_blank',
      },
      {
        name: 'Neurobiology',
        url: 'https://phenovista.com/neurobiology-assay-services',
        target: '_blank',
      },
      {
        name: 'Oncology & Immuno-oncology',
        url: 'https://phenovista.com/oncology-immuno-oncology-assay-services',
        target: '_blank',
      },
      {
        name: 'Cell & Gene Therapy',
        url: 'https://phenovista.com/cell-and-gene-therapy-assay-services',
        target: '_blank',
      },
    ],
  },
  {
    header: 'Helpful Links',
    links: [
      {
        name: 'About Us',
        url: 'https://phenovista.com/about-us',
        target: '_blank',
      },
      {
        name: 'Expertise',
        url: 'https://phenovista.com/expertise',
        target: '_blank',
      },
      {
        name: 'Privacy Policy',
        url: '/legal-notices/privacy-policy',
      },
    ],
  },
]

export const FOOTER_SOCIALS = [
  {
    icon: 'twitter',
    url: 'www.twitter.com',
  },
  {
    icon: 'instagram',
    url: 'www.instagram.com',
  },
  {
    icon: 'facebook',
    url: 'www.facebook.com',
  },
]

export const LEGAL_NOTICES = [
  {
    name: 'Cookie Policy',
    url: 'legal-notices/cookie-policy',
  },
  {
    name: 'Privacy Policy',
    url: 'legal-notices/privacy-policy',
  },
  {
    name: 'Terms and Conditions',
    url: 'legal-notices/terms-and-conditions',
  },
  {
    name: 'Terms of Use',
    url: 'legal-notices/terms-of-use',
  },
]

export const STATUS_ARRAY = [
  {
    statusLabel: 'Under Review',
    statusIcon: 'fa-list-check',
  },
  {
    statusLabel: 'SOW Selection',
    statusIcon: 'fa-square-check',
  },
  {
    statusLabel: 'Work Started',
    statusIcon: 'fa-vial',
  },
  {
    statusLabel: 'Work Completed',
    statusIcon: 'fa-vial-circle-check',
  },
]

export const NAVIGATION_LINKS = [
  {
    label: 'Store',
    onClick: null,
    path: '/',
  },
  {
    label: 'Browse',
    onClick: null,
    path: '/browse',
  },
  {
    label: 'Requests',
    onClick: null,
    path: '/requests',
  },
]

// updates the title link on the featured service cards on the homepage.
// 'requests/new' will link to a new request for that service
// change this to '/services' to have this link to a page for an individual service.
// if you choose to go this route, you can update the content for the service's page at pages/services/[ware].js
export const FEATURED_SERVICE_PATH = '/requests/new'

// TODO(alishaevn): use the api value from https://github.com/assaydepot/rx/issues/21497 in the next phase
// this amount, listed in milliseconds, represents when the access token will expire
// the default is 1 week
export const EXPIRATION_DURATION = 604800000

export const API_PER_PAGE = 2000

export const WEBHOOK_EVENTS = {
  'signer': {
    'signature_voided': false,
    'signature_requested': false,
  },
  'vendor': {
    'new_request': false,
    'rfi_expired': false,
    'po_obsoleted': false,
    'work_started': false,
    'rfi_submitted': false,
    'sow_requested': false,
    'proposal_denied': false,
    'resource_shared': false,
    'invited_new_user': false,
    'proposal_expired': false,
    'signature_voided': false,
    'cancelled_request': false,
    'proposal_approved': false,
    'signature_requested': false,
    'timeline_post_added': false,
    'legal_document_signed': false,
    'share_token_generated': false,
    'legal_documents_updated': false,
    'rfi_expiration_reminder': false,
    'provider_credit_rejected': false,
    'request_updated_proposal': false,
    'provider_invoice_rejected': false,
    'supplier_approval_required': false,
    'request_description_updated': false,
    'signed_legal_document_revoked': false,
    'provider_credit_sent_to_customer': false,
    'provider_invoice_sent_to_customer': false,
  },
  'approver': {
    'approval_cancelled': false,
    'approval_requested': false,
    'user_legal_obligation_changed': false,
    'compliance_manifest_approved_by': false,
  },
  'customer': {
    'complete': true,
    'sow_submitted': true,
    'resource_shared': true,
    'signing_complete': true,
    'cancelled_request': true,
    'invoice_submitted': false,
    'estimate_submitted': true,
    'amendment_submitted': true,
    'timeline_post_added': true,
    'compliance_submitted': true,
    'share_token_generated': true,
    'unapproved_for_payment': false,
    'wip_timeline_post_added': true,
    'milestone_shipping_updated': true,
    'proposal_compliance_denied': true,
    'purchase_compliance_denied': true,
    'internal_timeline_post_added': true,
    'proposal_compliance_approved': true,
    'purchase_compliance_approved': true,
    'user_legal_obligation_changed': true,
    'sow_accepted_for_external_purchase': true,
  },
  'site_rep': {
    'rfi_badged': false,
    'new_request': false,
    'sow_accepted': false,
    'work_started': false,
    'sow_requested': false,
    'sow_submitted': false,
    'supplier_added': false,
    'signing_complete': false,
    'cancelled_request': false,
    'estimate_submitted': false,
    'amendment_submitted': false,
    'supplier_ad_created': false,
    'timeline_post_added': false,
    'legal_document_signed': false,
    'request_sent_to_vendors': false,
    'wip_timeline_post_added': false,
    'invoice_payment_rejected': false,
    'request_updated_proposal': false,
    'legal_documents_challenged': false,
    'proposal_compliance_denied': false,
    'purchase_compliance_denied': false,
    'request_compliance_approved': false,
    'request_description_updated': false,
    'internal_timeline_post_added': false,
    'proposal_compliance_approved': false,
    'purchase_compliance_approved': false,
    'signed_legal_document_revoked': false,
    'user_legal_obligation_changed': false,
    'sow_accepted_for_external_purchase': false,
  },
  'vendor_approver': {
    'proposal_approval_requested': false,
  },
  'vendor_follower': {
    'new_request': false,
    'rfi_expired': false,
    'work_started': false,
    'rfi_submitted': false,
    'sow_requested': false,
    'added_as_follower': false,
    'cancelled_request': false,
    'timeline_post_added': false,
    'rfi_expiration_reminder': false,
    'request_updated_proposal': false,
    'supplier_approval_required': false,
    'request_description_updated': false,
  },
  'approval_follower': {
    'approval_cancelled': false,
    'approval_requested': false,
    'user_legal_obligation_changed': false,
    'compliance_manifest_approved_by': false,
  },
  'customer_follower': {
    'added_as_follower': true,
    'internal_timeline_post_added': true,
  },
  'vendor_approval_follower': {
    'proposal_approval_requested': false,
  },
  'app_store_organization_approver': {
    'app_revoked': false,
    'app_approved': false,
    'app_requested': false,
  },
  'app_store_organization_follower': {
    'app_revoked': false,
    'app_approved': false,
  }
}
