import Card from 'react-bootstrap/Card'
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline'
import { VscMegaphone } from 'react-icons/vsc';
import { GiGavel, GiDiscussion } from 'react-icons/gi';
import { GoCommentDiscussion } from 'react-icons/go';
import { FaStamp, FaFileSignature } from 'react-icons/fa';
import {dateTimeFormatter} from '../helpers/helpers'; 

const BillTimeline2 = ({bills}) => {

    const actionIcons = {
        IntroReferral: VscMegaphone,
        Committee: GiGavel,
        ResolvingDifferences: GiDiscussion,
        Floor: GoCommentDiscussion,
        President: FaStamp,
        Veto: FaStamp
    }

    const colors = {
        House: 'lightblue',
        Senate: 'lightgreen',
        null: 'red'
    };
    
    const actions = {
        IntroReferral: "Bill introduced in chamber.", 
        Committee: "Bill enters committees.",
        Floor: "Bill enters floor debate.",
        ResolvingDifferences: "Senate and House adjust bill text to match.",
        Veto: "Bill has been vetoed. Sent back to Congress to debate.",
        President: "President vetos bill."
    }; 


    return(
                    <Card.Body>
                        <Card.Title>Hover over the Icon to see the date and event.</Card.Title>
                        <Card.Text>Blue are House events, Green are Senate.</Card.Text>

                            <Timeline minEvents={1} maxEvents={10} variant="simple">
                                {bills.map(b => {
                                    if(b.description === "Presented to President.") {
                                        return <
                                        TimelineEvent
                                        icon={FaFileSignature}
                                        title="Presented to President"
                                        color="blue"
                                        subtitle={dateTimeFormatter(b.datetime)}
                                        />;
                                    } else {
                                        return <
                                        TimelineEvent
                                        icon={actionIcons[b.action_type]}
                                        title={dateTimeFormatter(b.datetime)}
                                        subtitle={actions[b.action_type]}
                                        color={colors[b.chamber]}
                                        />
                                    }
                                })}
                                </Timeline>
                        <Card.Text>This is a shortened timeline to show the 10 most important actions taken on this bill.<br/>To see the full list of bill actions, check below. </Card.Text>
                    </Card.Body>

    )
}

export default BillTimeline2; 

// export default BillTimeline; 

// {bills.map(b => (
//     <TimelineEvent
//     icon={b.description==="Presented to President." ? FaPenFancy : actions[b.action_type][1]}
//     title={b.description==="Presented to President." ? b.description : actions[b.action_type][0]}
//     subtitle={b.datetime}
//     color={b.chamber==="Senate" ? "lightgreen" : "lightblue"}
//     />
//     ))}

