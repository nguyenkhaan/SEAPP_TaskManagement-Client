import React from "react";
import ReactDOM from "react-dom";
import TeamMemberItem from "./TeamMemberItem";
function TeamMember({
    width = "100%",
    height = "100%",
    leader = {},
    viceLeader = {},
    members = [],
    currentRole = "", //role cua thang dang dang nhap 
}) {
    return (
        <article
            className={`rounded-2xl flex gap-2 flex-col pb-6 items-start px-3 justify-between shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden  text-black bg-(--color-background-2)`}
            style={{ width, height }}>
            <div className="h-26 relative text-(--color-text) flex items-center justify-between py-2 gap-1 border-b mb-3 border-b-gray-400 w-full px-2">
                <h2 className="text-[24px] font-medium">Team Members</h2>
                <span className="">
                    <i class="fa-regular fa-user"></i> {members.length}
                </span>
            </div>
            <ul className="w-full h-[520px] px-2 gap-3 py-3 overflow-y-scroll overflow-x-hidden wrapper flex flex-col pb-6">
                <TeamMemberItem
                    name={leader.name}
                    role="Leader"
                    avatar_url={leader.avatar_url}
                    currentRole={currentRole}
                    id={leader.id}
                />
                {viceLeader && (
                    <TeamMemberItem
                        name={viceLeader.name}
                        role="Vice Leader"
                        avatar_url={viceLeader.avatar_url}
                        currentRole={currentRole}
                        id={viceLeader.id}
                    />
                )}

                {members
                    .filter((member, index) => {
                        return (
                            member.id != leader.id &&
                            (!viceLeader || member.id != viceLeader.id)
                        );
                    })
                    .map((member, index) => {
                        return (
                            <TeamMemberItem
                                currentRole={currentRole}
                                key={index}
                                name={member.name}
                                avatar_url={member.avatar_url}
                                role="Member" 
                                id={member.id}
                            />
                        );
                    })}
            </ul>
        </article>
    );
}
export default TeamMember;
