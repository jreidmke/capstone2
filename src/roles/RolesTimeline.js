import React, { useEffect, useState } from "react"
import { Chrono } from "react-chrono";

const RolesTimeline = ({pol}) => {
    const [items, setItems] = useState();

    useEffect(() => {
        let i = pol.roles.map(r => ({title: r.title, cardTitle: `Term Start: ${r.start_date}`, cardSubtitle: `Voting With Party: ${r.votes_with_party_pct}%`, cardDetailedText: `Committee Memberships: ${r.committees.map(c => c.name)}`}));
        setItems(i);
    }, []);

    return(
        <div>
            {items ? <div style={{ width: "460px", height: "550px" }}>
                <Chrono items={items} mode="VERTICAL_ALTERNATING" hideControls	 />
        </div> : "Loading"}
        </div>
        
    )
    }

    export default RolesTimeline;
// }

// title	title of the timeline item	String
// cardTitle	title that is displayed on the timeline card	String
// cardSubtitle	text displayed in the timeline card	String
// cardDetailedText	detailed text displayed in the timeline card	String or String[]
// media	media object to set image or video.	Object

// bills_cosponsored: 657
// bills_sponsored: 69
// chamber: "Senate"
// committees: Array(3)
// 0:
// api_uri: "https://api.propublica.org/congress/v1/116/senate/committees/SSCM.json"
// begin_date: "2019-01-09"
// code: "SSCM"
// end_date: "2021-01-03"
// name: "Committee on Commerce, Science, and Transportation"
// rank_in_party: 8
// side: "minority"
// title: "Member"
// __proto__: Object
// 1: {name: "Committee on Health, Education, Labor, and Pensions", code: "SSHR", api_uri: "https://api.propublica.org/congress/v1/116/senate/committees/SSHR.json", side: "minority", title: "Member", …}
// 2: {name: "Committee on Appropriations", code: "SSAP", api_uri: "https://api.propublica.org/congress/v1/116/senate/committees/SSAP.json", side: "minority", title: "Member", …}
// length: 3
// __proto__: Array(0)
// congress: "116"
// contact_form: "https://www.baldwin.senate.gov/feedback"
// cook_pvi: null
// dw_nominate: -0.493
// end_date: "2021-01-03"
// fax: null
// fec_candidate_id: "H8WI00018"
// ideal_point: null
// leadership_role: null
// lis_id: "S354"
// missed_votes: 2
// missed_votes_pct: 0.28
// next_election: "2024"
// ocd_id: "ocd-division/country:us/state:wi"
// office: "709 Hart Senate Office Building"
// party: "D"
// phone: "202-224-5653"
// senate_class: "1"
// seniority: "7"
// short_title: "Sen."
// start_date: "2019-01-03"
// state: "WI"
// state_rank: "junior"
// subcommittees: (11) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// title: "Senator, 1st Class"
// total_present: 1
// total_votes: 717
// votes_against_party_pct: 5.35
// votes_with_party_pct: 94.65