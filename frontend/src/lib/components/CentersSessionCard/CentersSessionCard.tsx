import React from 'react'
import Card from '@material-ui/core/Card'
import { Row, Col } from 'antd'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Chip from '@material-ui/core/Chip'
import { findSlotsLogic } from 'scenes/findSlots/findSlotsLogic'
import Typography from '@material-ui/core/Typography'
import { CardProps } from '~/types'

const CentersSessionCard: React.FC<CardProps> = ({ details }) => {
    const appliedDoseFilter = findSlotsLogic.values.dose

    return (
        <Card className="mb" raised>
            <CardActionArea
                href={details[appliedDoseFilter] > 0 ? 'https://selfregistration.cowin.gov.in/' : ''}
                target="_blank"
            >
                <Row>
                    <Col span={18}>
                        <CardContent>
                            <Typography style={{ fontSize: '0.875rem', fontWeight: 600 }}>{details.name}</Typography>

                            <Typography color="textSecondary" style={{ fontSize: '0.875rem' }}>
                                <LocationOnIcon fontSize="inherit" />
                                {`${details.block_name}, ${details.pincode}`}
                            </Typography>

                            <div className="mt-05">
                                <Chip label={`${details.min_age_limit}+`} size="small" variant="outlined" />
                            </div>

                            <div className="mt-05">
                                <Typography component="h5" style={{ fontSize: '0.875rem' }}>
                                    {`Vaccine: ${details.vaccine}`}
                                    <Chip
                                        label={details.fee == 0 ? 'Free' : `₹${details.fee}`}
                                        style={{
                                            color: details.fee > 0 ? '#f96132' : '#40a9ff',
                                            borderColor: details.fee > 0 ? '#f96132' : '#40a9ff',
                                        }}
                                        size="small"
                                        variant="outlined"
                                        className="ml-05"
                                    />
                                </Typography>
                            </div>
                        </CardContent>
                    </Col>

                    <Col
                        span={6}
                        style={{
                            backgroundColor:
                                details[appliedDoseFilter] == 0
                                    ? 'rgb(157, 157, 157)'
                                    : details[appliedDoseFilter] > 10
                                    ? '#77b96c'
                                    : '#f7a501',
                            color: 'white',
                        }}
                    >
                        {details[appliedDoseFilter] > 0 ? (
                            <>
                                <div
                                    style={{
                                        height: '70%',
                                        textAlign: 'center',
                                    }}
                                    className="pa"
                                >
                                    <Typography style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                                        {details[appliedDoseFilter]}
                                    </Typography>
                                    <Typography style={{ fontSize: '0.875rem', fontWeight: 600 }}>Slots</Typography>
                                </div>

                                <div
                                    style={{
                                        height: '30%',
                                        textAlign: 'center',
                                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    }}
                                    className="pr pl"
                                >
                                    <Typography style={{ fontSize: '0.75rem', fontWeight: 400 }}>
                                        Book on CoWIN
                                    </Typography>
                                </div>
                            </>
                        ) : (
                            <div
                                style={{
                                    textAlign: 'center',
                                    marginTop: '50%',
                                }}
                                className="pa"
                            >
                                <Typography style={{ fontSize: '0.875rem', fontWeight: 600 }}>No Slots</Typography>
                            </div>
                        )}
                    </Col>
                </Row>
            </CardActionArea>
        </Card>
    )
}

export default CentersSessionCard
