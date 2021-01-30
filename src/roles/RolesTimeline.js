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
